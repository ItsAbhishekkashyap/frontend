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
    console.log('Received userId:', userId);
    if (!userId) {
      console.error('No user ID found in request');
      return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    await connectToDB();
    console.log('Connected to DB');

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      console.error('User not found with ID:', userId);
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    console.log('User found:', user._id);

    if (!user.payments || user.payments.length === 0) {
      console.error('No payment history found for user:', userId);
      return NextResponse.json({ error: 'No payment history found.' }, { status: 400 });
    }
    console.log(`User has ${user.payments.length} payments`);

    const latestSubscription = user.payments
      .filter((p: IPaymentReference) => !!p.subscriptionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    if (!latestSubscription?.subscriptionId) {
      console.error('No active subscription found for userId:', userId);
      return NextResponse.json({ error: 'No active subscription found to cancel.' }, { status: 400 });
    }
    console.log('Latest subscription ID:', latestSubscription.subscriptionId);

    const subscriptionDetails = await razorpay.subscriptions.fetch(latestSubscription.subscriptionId);
    console.log('Fetched subscription details:', subscriptionDetails);

    // Check 7-day window based on Razorpay start_at
    const startAt = new Date(subscriptionDetails.start_at * 1000);
    console.log('Subscription start date:', startAt.toISOString());
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    console.log('7 days ago date:', sevenDaysAgo.toISOString());

    if (startAt < sevenDaysAgo) {
      console.error('Subscription start date is older than 7 days. Cancellation not allowed.');
      return NextResponse.json({ error: 'Subscription can only be cancelled within 7 days of start.' }, { status: 400 });
    }

   if (subscriptionDetails.status === 'cancelled' && latestSubscription.status !== 'cancelled') {
  console.log('Razorpay subscription cancelled but DB status not updated. Fixing DB...');
  latestSubscription.status = 'cancelled';
  user.premium = false;
  user.premiumSince = undefined;
  await user.save();
  return NextResponse.json({ message: 'Subscription already cancelled, DB updated accordingly.' });
}

    const cancelledSubscription = await razorpay.subscriptions.cancel(latestSubscription.subscriptionId);
    console.log('Cancelled subscription response:', cancelledSubscription);

    if (cancelledSubscription.status !== 'cancelled') {
      console.error('Failed to cancel subscription on Razorpay:', cancelledSubscription);
      return NextResponse.json({ error: 'Failed to cancel subscription on Razorpay.' }, { status: 500 });
    }

    // Update user document
    user.premium = false;
    user.premiumSince = undefined;
    latestSubscription.status = 'cancelled'; // Make sure your enum includes 'cancelled'

    await user.save();
    console.log('User document updated after cancellation');

    return NextResponse.json({ message: 'Subscription cancelled successfully.', cancelledSubscription });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription.', details: (error as Error).message },
      { status: 500 }
    );
  }
}




