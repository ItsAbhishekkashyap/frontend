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

  const userExists = await User.findOne({ email });
  if (userExists)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  const token = signToken({ id: user._id, email: user.email });

  return NextResponse.json({ token, user: { email: user.email } });
}
