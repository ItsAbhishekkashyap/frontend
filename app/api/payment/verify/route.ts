import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDB } from '@/lib/mongodb'; // you should have this to connect MongoDB
import {User} from '@/models/User'; // your user model

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = await req.json();

  const sign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (sign === razorpay_signature) {
    await connectToDB();
    await User.findByIdAndUpdate(userId, { premium: true, premiumSince: new Date() });
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
  }
}
