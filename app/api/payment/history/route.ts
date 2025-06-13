// app/api/payment/history/route.ts
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { Payment } from '@/models/Payment';

export async function GET(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const payments = await Payment.find({ 
    userId: user._id 
  }).sort({ createdAt: -1 });

  return NextResponse.json(payments.map(p => ({
    id: p._id,
    amount: p.amount / 100, // Convert to rupees
    currency: p.currency,
    status: p.status,
    date: p.createdAt,
    invoiceId: p.invoiceId,
    planId: p.planId
  })));
}