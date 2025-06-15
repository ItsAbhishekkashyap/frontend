import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Payment } from '@/models/Payment';
import { razorpay } from '@/lib/razorpay';

async function streamToBuffer(readableStream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = readableStream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await streamToBuffer(req.body as ReadableStream<Uint8Array>);
    const signature = req.headers.get('x-razorpay-signature')!;
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Signature mismatch');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody.toString());
    console.log('Webhook event received:', event.event);

    await connectToDB();

    const isPaymentCaptured = event.event === 'payment.captured';
    if (isPaymentCaptured) {
      const payload = event.payload.payment.entity;
      const subscriptionId = payload.subscription_id;

      if (!subscriptionId) {
        console.error('Missing subscription_id in payment payload');
        return NextResponse.json({ error: 'No subscription_id found' }, { status: 400 });
      }

      // Fetch full subscription from Razorpay to get notes (userId)
      const subscription = await razorpay.subscriptions.fetch(subscriptionId);
      const notes = subscription.notes || {};
      const userId = notes.userId;

      if (!userId) {
        console.error('userId not found in subscription notes');
        return NextResponse.json({ error: 'No userId in subscription notes' }, { status: 400 });
      }

      console.log('UserID fetched from subscription notes:', userId);

      // Save Payment in DB
      const newPayment = await Payment.create({
        userId,
        razorpayPaymentId: payload.id,
        razorpayOrderId: payload.order_id || '',
        amount: payload.amount,
        currency: payload.currency,
        status: 'captured',
        invoiceId: notes.invoiceId || '',
        planId: notes.planId || '',
        createdAt: new Date(),
      });

      // Update User to premium
      await User.findByIdAndUpdate(userId, {
        $set: { premium: true, premiumSince: new Date() },
        $push: { payments: {
          _id: newPayment._id,
          razorpayId: payload.id,
          amount: payload.amount,
          currency: payload.currency,
          status: 'completed',
          invoiceId: notes.invoiceId || '',
          planId: notes.planId || '',
          createdAt: newPayment.createdAt,
        }}
      });

      console.log('User upgraded to premium:', userId);
    }

    return NextResponse.json({ received: true });
  } catch (e: unknown) {
    console.error('Webhook processing error:', e);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}



