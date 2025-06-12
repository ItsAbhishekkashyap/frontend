import { razorpay } from '@/lib/razorpay';
import { NextResponse } from 'next/server';

export async function POST() {
  const options = {
    amount: 999 * 100, // ₹999 in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
