import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectToDB } from '@/lib/mongodb';
import {Payment} from '@/models/Payment'; // Your payment schema
import {User} from '@/models/User'; // Your user schema

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const payment = await Payment.findOne({ userId }).sort({ createdAt: -1 });

    if (!payment) {
      return NextResponse.json({ error: 'No payment record found.' }, { status: 404 });
    }

    if (payment.status === 'refunded') {
      return NextResponse.json({ error: 'Payment already refunded.' }, { status: 400 });
    }

    // Trigger Razorpay Refund
    const refund = await razorpay.payments.refund(payment.paymentId, {
      amount: payment.amount, // refund full amount
      speed: 'optimum', // 'optimum' or 'instant'
    });

    // Update payment record in DB
    payment.status = 'refunded';
    await payment.save();

    return NextResponse.json({ success: true, refund });
  } catch (error) {
    console.error('Refund Error:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
