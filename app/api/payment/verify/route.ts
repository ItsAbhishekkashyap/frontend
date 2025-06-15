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
    const { subscriptionId, paymentId, signature, userId} = await req.json();

    if (!subscriptionId || !paymentId || !signature || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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

    // Push new payment into payments array
    user.payments.push({
      razorpayId: paymentId,
      amount:19900,
      currency:'INR',
      status: 'completed', // ✅ Correct enum value
      invoiceId:'N/A',
      planId:'montlhy_plan',
      createdAt: new Date(),
    });

    // premium + premiumSince handled automatically by pre('save') hook.
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}


