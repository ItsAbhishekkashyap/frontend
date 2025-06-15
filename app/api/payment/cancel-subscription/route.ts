import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectToDB } from '@/lib/mongodb';
import { User, IUser, IPaymentReference } from '@/models/User';

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

    const user: IUser | null = await User.findById(userId);

    if (!user || !user.payments || user.payments.length === 0) {
      return NextResponse.json({ error: 'No payment history found.' }, { status: 400 });
    }

    // Find the latest subscription with a valid subscriptionId
    const latestSubscription = user.payments
      .filter((p: IPaymentReference) => p.subscriptionId)
      .sort((a: IPaymentReference, b: IPaymentReference) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      )[0];

    if (!latestSubscription || !latestSubscription.subscriptionId) {
      return NextResponse.json({ error: 'No active subscription found to cancel.' }, { status: 400 });
    }

    // Cancel subscription via Razorpay
    const cancelledSubscription = await razorpay.subscriptions.cancel(latestSubscription.subscriptionId);

    return NextResponse.json({ message: 'Subscription cancelled successfully.', cancelledSubscription });

  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json({ error: 'Failed to cancel subscription.' }, { status: 500 });
  }
}


