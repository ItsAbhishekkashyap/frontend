import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest, context: { params: { token: string } }
) {
    const { params } = await context;
  try {
    await connectToDB();

    const { password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({
      resetToken: params.token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Token invalid or expired' }, { status: 400 });
    }

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
