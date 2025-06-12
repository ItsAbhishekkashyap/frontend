import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

// Manually define the correct type inline (no import needed)
export async function POST() {
  const options: {
    plan_id: string;
    customer_notify: boolean | 0 | 1;
    total_count: number;
  } = {
    plan_id: 'plan_LnVOg123456abc', // your real or dummy Razorpay plan_id
    customer_notify: 1,             // notify customer
    total_count: 12                 // required: number of billing cycles
  };

  try {
    const subscription = await razorpay.subscriptions.create(options);
    return NextResponse.json(subscription);
  } catch (err) {
    // Type safe error handling
    const error = err as { message?: string };
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}


