import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDB } from '@/lib/mongodb'; // Adjust this path to your DB connection file
import { User } from '@/models/User';        // Adjust this path to your User model

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    await connectToDB();

    const cookie = req.headers.get('cookie') || '';
    const tokenCookie = cookie.split('; ').find((c) => c.startsWith('token='));

    if (!tokenCookie) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const token = tokenCookie.split('=')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId).select('email premium');
    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        premium: user.premium,
      },
    });
  } catch (err) {
    console.error('[auth/me] Error:', err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

