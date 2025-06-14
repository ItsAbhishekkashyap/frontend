import { NextRequest, NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';

interface RazorpayAddon {
  item: {
    name: string;
    amount: number;
    currency: string;
  };
  quantity?: number;
}

interface SubscriptionCreateOptions {
  plan_id: string;
  total_count: number;
  customer_notify?: 0 | 1;
  quantity?: number;
  start_at?: number;
  expire_by?: number;
  offer_id?: string;
  addons?: RazorpayAddon[];
  notes?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const options: SubscriptionCreateOptions = {
      plan_id: 'plan_QgmHnvW6tBIhg0', // Use your actual Razorpay plan ID
      total_count: 12,                 // 12 months or any cycle you want
      customer_notify: 1,              // Notify customer on creation
      notes: {
        userId,                        // Very important: This will come in webhook under 'notes'
        planId: 'monthly_plan',        // Optional: Identify plan type if multiple plans used
      }
    };

    // Create subscription via Razorpay API
    const subscription = await razorpay.subscriptions.create(options);

    // Log important subscription details
    console.log('Razorpay Subscription Created:', {
      id: subscription.id,
      customer_id: subscription.customer_id,
      plan_id: subscription.plan_id,
      status: subscription.status,
    });

    return NextResponse.json(subscription);
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error('Error creating subscription:', error.message || err);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}







