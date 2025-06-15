// import { NextRequest, NextResponse } from 'next/server';
// import Razorpay from 'razorpay';
// import { connectToDB } from '@/lib/mongodb';
// import { User, IUser, IPaymentReference } from '@/models/User';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = await req.json();
//     console.log('Received userId:', userId);
//     if (!userId) {
//       console.error('No user ID found in request');
//       return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
//     }

//     await connectToDB();
//     console.log('Connected to DB');

//     const user: IUser | null = await User.findById(userId);
//     if (!user) {
//       console.error('User not found with ID:', userId);
//       return NextResponse.json({ error: 'User not found.' }, { status: 404 });
//     }
//     console.log('User found:', user._id);

//     if (!user.payments || user.payments.length === 0) {
//       console.error('No payment history found for user:', userId);
//       return NextResponse.json({ error: 'No payment history found.' }, { status: 400 });
//     }
//     console.log(`User has ${user.payments.length} payments`);

//     const latestSubscription = user.payments
//       .filter((p: IPaymentReference) => !!p.subscriptionId)
//       .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

//     if (!latestSubscription?.subscriptionId) {
//       console.error('No active subscription found for userId:', userId);
//       return NextResponse.json({ error: 'No active subscription found to cancel.' }, { status: 400 });
//     }
//     console.log('Latest subscription ID:', latestSubscription.subscriptionId);

//     const subscriptionDetails = await razorpay.subscriptions.fetch(latestSubscription.subscriptionId);
//     console.log('Fetched subscription details:', subscriptionDetails);

//     // Check 7-day window based on Razorpay start_at
//     const startAt = new Date(subscriptionDetails.start_at * 1000);
//     console.log('Subscription start date:', startAt.toISOString());
//     const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//     console.log('7 days ago date:', sevenDaysAgo.toISOString());

//     if (startAt < sevenDaysAgo) {
//       console.error('Subscription start date is older than 7 days. Cancellation not allowed.');
//       return NextResponse.json({ error: 'Subscription can only be cancelled within 7 days of start.' }, { status: 400 });
//     }

//    if (subscriptionDetails.status === 'cancelled' && latestSubscription.status !== 'cancelled') {
//   console.log('Razorpay subscription cancelled but DB status not updated. Fixing DB...');
//   latestSubscription.status = 'cancelled';
//   user.premium = false;
//   user.premiumSince = undefined;
//   await user.save();
//   return NextResponse.json({ message: 'Subscription already cancelled, DB updated accordingly.' });
// }

//     const cancelledSubscription = await razorpay.subscriptions.cancel(latestSubscription.subscriptionId);
//     console.log('Cancelled subscription response:', cancelledSubscription);

//     if (cancelledSubscription.status !== 'cancelled') {
//       console.error('Failed to cancel subscription on Razorpay:', cancelledSubscription);
//       return NextResponse.json({ error: 'Failed to cancel subscription on Razorpay.' }, { status: 500 });
//     }

//     // Update user document
//     user.premium = false;
//     user.premiumSince = undefined;
//     latestSubscription.status = 'cancelled'; // Make sure your enum includes 'cancelled'

//     await user.save();
//     console.log('User document updated after cancellation');

//     return NextResponse.json({ message: 'Subscription cancelled successfully.', cancelledSubscription });
//   } catch (error) {
//     console.error('Error cancelling subscription:', error);
//     return NextResponse.json(
//       { error: 'Failed to cancel subscription.', details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }





import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectToDB } from '@/lib/mongodb';
import { User, IUser, IPaymentReference } from '@/models/User';

// Define minimal Razorpay response types for type safety
interface RazorpaySubscription {
  id: string;
  entity: 'subscription';
  status: 'active' | 'cancelled' | 'pending' | string;
  start_at: number; // Unix timestamp in seconds
}

interface RazorpayRefund {
  id: string;
  entity: 'refund';
  amount: number; // in paise
  status: 'processed' | 'pending' | 'failed' | string;
  created_at: number; // Unix timestamp in seconds
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = (await req.json()) as { userId?: string };

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    await connectToDB();

    const user: IUser | null = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!user.payments || user.payments.length === 0) {
      return NextResponse.json({ error: 'No payment history found.' }, { status: 400 });
    }

    // Get the latest subscription payment (with subscriptionId)
    const latestSubscription = user.payments
      .filter((p: IPaymentReference) => !!p.subscriptionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    if (!latestSubscription || !latestSubscription.subscriptionId) {
      return NextResponse.json({ error: 'No active subscription found to cancel.' }, { status: 400 });
    }

    // Fetch subscription details from Razorpay with proper typing
    const subscriptionDetails = (await razorpay.subscriptions.fetch(
      latestSubscription.subscriptionId
    )) as RazorpaySubscription;

    // Check 7-day refund window
    const subscriptionStart = new Date(subscriptionDetails.start_at * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    if (subscriptionStart < sevenDaysAgo) {
      return NextResponse.json(
        { error: 'Refund and cancellation allowed only within 7 days of subscription start.' },
        { status: 400 }
      );
    }

    if (!latestSubscription.razorpayId) {
      return NextResponse.json({ error: 'No Razorpay payment ID found for refund.' }, { status: 400 });
    }

    // Issue refund request
    const refundResponse = (await razorpay.payments.refund(
      latestSubscription.razorpayId,
      {
        amount: Math.floor(latestSubscription.amount * 0.5), // amount in paise
      }
    )) as RazorpayRefund;

    // Update payment record with refund info (convert paise to INR)
    latestSubscription.refundedAmount = refundResponse.amount / 100;
    latestSubscription.refundStatus = refundResponse.status;
    latestSubscription.refundDate = new Date(refundResponse.created_at * 1000);

    // Cancel subscription if not already cancelled
    if (subscriptionDetails.status !== 'cancelled') {
      const cancelledSubscription = await razorpay.subscriptions.cancel(latestSubscription.subscriptionId);

      if (cancelledSubscription.status !== 'cancelled') {
        return NextResponse.json(
          { error: 'Failed to cancel subscription on Razorpay.' },
          { status: 500 }
        );
      }
    }

    // Update user document to reflect cancellation
    user.premium = false;
    user.premiumSince = undefined;
    latestSubscription.status = 'cancelled';

    await user.save();

    return NextResponse.json({ message: 'Refund and cancellation successful.' });
  } catch (error) {
    console.error('Refund and cancellation error:', error);
    return NextResponse.json(
      { error: 'Refund and cancellation failed.', details: (error as Error).message },
      { status: 500 }
    );
  }
}
