// /app/api/auth/google/callback/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User'; // Your model path here

export async function GET(req: NextRequest) {
  await connectToDB(); // Ensure MongoDB is connected

  const code = req.nextUrl.searchParams.get('code');
  const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!;
  const client_id = process.env.GOOGLE_CLIENT_ID!;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET!;
  const jwt_secret = process.env.JWT_SECRET!;

  if (!code) {
    return NextResponse.json({ error: 'No code in URL' }, { status: 400 });
  }

  try {
    // 1. Exchange code for access token
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const {  access_token } = data;

    // 2. Get user info
    const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, name, picture } = userInfoRes.data;

    // 3. Check user in DB
    let user = await User.findOne({ email });

    if (!user) {
      // 4. Create user if not exists
      user = await User.create({
        email,
        name,
        picture,
        provider: 'google', // Custom field to identify Google users
      });
    }

    // 5. Issue JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      jwt_secret,
      { expiresIn: '7d' } // valid for 7 days
    );

    // 6. Send JWT token in cookies or as JSON
    const response = NextResponse.redirect('https://ashrtl.vercel.app/dashboard'); // or any protected page

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Google OAuth Error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
