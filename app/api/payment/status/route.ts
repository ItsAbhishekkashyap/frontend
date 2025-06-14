import {  NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET() {
    
  await connectToDB();

  // Simulate logged-in user (replace with real user session ID)
  const userEmail = 'abhi47025@gmail.com'; // Example: replace this in production

  const user = await User.findOne({ email: userEmail }).select('+payments');

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({
    premium: user.premium,
    premiumSince: user.premiumSince,
    lastPayment: user.lastPayment
  });
}
