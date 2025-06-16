// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';
// import { connectToDB } from '@/lib/mongodb';
// import { User } from '@/models/User';

// export async function POST(req: NextRequest) {
//   await connectToDB();

//   try {
//     const { subscriptionId, paymentId, signature, userId, amount, currency, planId } = await req.json();

//     if (!subscriptionId || !paymentId || !signature || !userId) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Verify signature
//     const generatedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
//       .update(`${paymentId}|${subscriptionId}`)
//       .digest('hex');

//     if (generatedSignature !== signature) {
//       return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Mark premium & push payment details
//     user.premium = true;
//     user.premiumSince = new Date();

//     if (!user.payments) {
//       user.payments = [];
//     }

//     user.payments.push({
//       razorpayId: paymentId,
//       subscriptionId: subscriptionId,
//       status: 'paid',
//       amount: amount || 0,        // pass amount from frontend if possible
//       currency: currency || 'INR',
//       planId: planId || 'unknown',
//       createdAt: new Date(),
//     });

//     await user.save();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error verifying payment:', error);
//     return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  await connectToDB();

  try {

    interface Payment {
  subscriptionId: string;
  status: string;
  razorpayId: string;
  // Add other properties as needed
}
    const { subscriptionId, paymentId, signature, userId } = await req.json();

    if (!subscriptionId || !paymentId || !signature || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${paymentId}|${subscriptionId}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find existing payment with subscriptionId & status 'pending'
    const payment = user.payments.find((p: Payment) => p.subscriptionId === subscriptionId && p.status === 'pending');

    if (payment) {
      // Update this payment with razorpay payment id & status completed
      payment.razorpayId = paymentId;
      payment.status = 'completed';
      payment.createdAt = new Date(); // update payment date to now (optional)
    } else {
      // No pending payment found for subscription, push new one just in case
      user.payments.push({
        razorpayId: paymentId,
        subscriptionId,
        amount: 19900,
        
        currency: 'INR',
        status: 'completed',
        invoiceId: 'N/A',
        planId: 'monthly_plan',
        createdAt: new Date(),
        refundedAmount: 0,
      });
    }

    // You might want to set premium flags here or rely on pre-save hook
    // user.premium = true;
    // user.premiumSince = new Date();

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}



