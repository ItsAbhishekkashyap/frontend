// File: app/api/auth/forgot-password/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'No user with that email' }, { status: 404 });
    }

    // Generate token and expiry
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 mins

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // ✅ For testing: just log the URL instead of sending an email
    console.log('🔗 Password reset link:', resetUrl);

    return NextResponse.json({ message: 'Reset link generated (check console)' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
