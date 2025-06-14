import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Payment } from '@/models/Payment';

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
      console.error('Signature mismatch:', signature, expectedSignature);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody.toString());
    console.log('Webhook event:', event.event, event.payload);

    await connectToDB();

    const isSubscriptionCharge = event.event === 'subscription.charged';
    const isPaymentCaptured = event.event === 'payment.captured';

    if (isSubscriptionCharge || isPaymentCaptured) {
      const payload = isSubscriptionCharge
        ? (event.payload.payment.entity)
        : (event.payload.payment.entity);

      const notes = payload.notes || {};
      const userId = notes.userId;
      if (!userId) {
        console.error('Missing notes.userId in webhook payload');
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
      }

      const newPayment = await Payment.create({
        userId,
        razorpayPaymentId: payload.id,
        razorpayOrderId: payload.order_id || '',
        amount: payload.amount,
        currency: payload.currency,
        status: isSubscriptionCharge ? 'captured' : 'captured',
        invoiceId: notes.invoiceId || '',
        planId: notes.planId || '',
        createdAt: new Date(),
      });

      const update = {
        premium: true,
        premiumSince: new Date(),
        payments: [{
          _id: newPayment._id,
          razorpayId: payload.id,
          amount: payload.amount,
          currency: payload.currency,
          status: 'completed',
          invoiceId: notes.invoiceId || '',
          planId: notes.planId || '',
          createdAt: newPayment.createdAt,
        }]
      };

      await User.findByIdAndUpdate(userId, {
        $set: { premium: true, premiumSince: new Date() },
        $push: { payments: update.payments[0] }
      });

      console.log('User upgraded and payment saved for userId:', userId);
    }

    return NextResponse.json({ received: true });
  } catch (e: unknown) {
    console.error('Webhook error:', e);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}



