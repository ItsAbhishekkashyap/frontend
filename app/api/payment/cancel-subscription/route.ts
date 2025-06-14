import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import {connectToDB} from '@/lib/mongodb';
import { User } from '@/models/User';

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

    if (!user || !user.payments || user.payments.length === 0) {
      return NextResponse.json({ error: 'No active subscription found.' }, { status: 400 });
    }

    const latestPayment = user.payments[user.payments.length - 1];
    const subscriptionId = latestPayment.planId;

    if (!subscriptionId) {
      return NextResponse.json({ error: 'No subscription ID found in user data.' }, { status: 400 });
    }

    const cancelledSubscription = await razorpay.subscriptions.cancel(subscriptionId);

    return NextResponse.json({ message: 'Subscription cancelled successfully.', cancelledSubscription });
     } catch (error) {
  console.error('Error cancelling subscription:', error);
  return NextResponse.json({ error: 'Failed to cancel subscription.' }, { status: 500 });
}
}
