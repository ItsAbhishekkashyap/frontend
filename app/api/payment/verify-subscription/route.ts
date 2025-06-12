import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDB } from '@/lib/mongodb';
import {User} from '@/models/User';

export async function POST(req: NextRequest) {
  const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature, userId } = await req.json();

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_payment_id + '|' + razorpay_subscription_id)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    await connectToDB();
    await User.findByIdAndUpdate(userId, { premium: true, premiumSince: new Date() });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: 'Invalid subscription signature' }, { status: 400 });
  }
}
