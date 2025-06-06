import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/app/lib/mongodb';
import { User } from '@/app/models/User';
import { signToken } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  await connectToDB();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 400 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });

  const token = signToken({ id: user._id, email: user.email });
  return NextResponse.json({ token, user: { email: user.email } });
}
