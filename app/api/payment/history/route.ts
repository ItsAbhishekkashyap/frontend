import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Payment } from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

export async function GET(req: Request) {
  await connectToDB();

  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payments = await Payment.find({ userId: user._id }).sort({ createdAt: -1 });

  return NextResponse.json(payments);
}
