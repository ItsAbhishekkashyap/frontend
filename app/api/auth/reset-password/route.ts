import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Missing token or password' }, { status: 400 });
    }

    await connectToDB();

    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Password reset error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
