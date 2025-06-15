import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { userId: string; email: string };
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
}

export async function GET() {
  await connectToDB();

  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dbUser = await User.findOne({ _id: user.userId }).select('+payments');
  console.log('User found in status route:', dbUser);

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const payments = dbUser.payments || [];
  const lastPayment = payments.length > 0 ? payments[payments.length - 1] : null;

  return NextResponse.json({
    userId: dbUser._id.toString(), // Added this line for frontend to get userId
    premium: dbUser.premium || false,
    premiumSince: dbUser.premiumSince || null,
    lastPayment: lastPayment
      ? {
          razorpayId: lastPayment.razorpayId,
          subscriptionId: lastPayment.subscriptionId || null,
          amount: lastPayment.amount,
          currency: lastPayment.currency,
          status: lastPayment.status,
          invoiceId: lastPayment.invoiceId || null,
          planId: lastPayment.planId,
          createdAt: lastPayment.createdAt,
        }
      : null,
  });
}





