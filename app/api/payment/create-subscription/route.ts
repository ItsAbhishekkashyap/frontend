import { NextRequest, NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';

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
  customer_id?: string;
}

interface RazorpayCustomer {
  id: string;
  email?: string;
}

interface Payment {
  razorpayId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: string;
  invoiceId: string;
  planId: string;
  createdAt: Date;
  refundedAmount: number;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, email, name, contact } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ error: 'userId and email are required' }, { status: 400 });
    }

    await connectToDB();

    // Fetch User
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Clean up old pending payments older than 30 minutes
    const THIRTY_MINUTES = 30 * 60 * 1000;
    const now = Date.now();

    user.payments = user.payments.filter((p: Payment) => {
      if (p.status === "pending") {
        return now - new Date(p.createdAt).getTime() < THIRTY_MINUTES;
      }
      return true;
    });

    await user.save();

    // Check for active subscriptions only (ignore pending)
    const activeSubscriptions = user.payments.filter(
      (payment: Payment) => payment.status === "active"
    );

    if (activeSubscriptions.length > 0) {
      return NextResponse.json(
        { error: "User already has an active subscription." },
        { status: 400 }
      );
    }

    // Check for existing Razorpay customer
    const allCustomersResponse = await razorpay.customers.all({ count: 100 });
    const existingCustomer = allCustomersResponse.items.find(
      (customer: RazorpayCustomer) => customer.email === email
    );

    let customerId;
    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const customer = await razorpay.customers.create({
        name: name || 'No Name',
        email,
        contact: contact || undefined,
      });
      customerId = customer.id;
    }

    // Create subscription options
    const options: SubscriptionCreateOptions = {
      plan_id: 'plan_QhukHxVGCjhpbB',
      total_count: 12,
      customer_notify: 1,
      customer_id: customerId,
      expire_by: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      notes: {
        userId,
        planId: 'monthly_plan',
      },
    };

    // Create subscription on Razorpay
    const subscription = await razorpay.subscriptions.create(options);
    console.log('Subscription ID:', subscription.id);

    // Add new subscription to user's payments with status pending
    user.payments.push({
      razorpayId: 'N/A',
      subscriptionId: subscription.id,
      amount: 19900,
      
      currency: 'INR',
      status: 'pending',
      invoiceId: 'N/A',
      planId: 'monthly_plan',
      createdAt: new Date(),
      refundedAmount: 0,
    });

    await user.save();

    console.log('Razorpay Subscription Created:', {
      id: subscription.id,
      customer_id: subscription.customer_id,
      plan_id: subscription.plan_id,
      status: subscription.status,
    });

    return NextResponse.json(subscription);
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}



