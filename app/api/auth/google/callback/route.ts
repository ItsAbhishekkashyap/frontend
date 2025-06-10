import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { signJwt } from '@/lib/jwt';


export async function GET(req: NextRequest) {
  await connectToDB();

  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const redirect_uri   = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!.includes('localhost')
    ? process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!
    : process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!.replace(
        'localhost:3000',
        'ashrtl.vercel.app'
      );
  const client_id     = process.env.GOOGLE_CLIENT_ID!;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET!;

  try {
    // 1) Exchange code for tokens
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      code, client_id, client_secret, redirect_uri, grant_type: 'authorization_code'
    });
    const { access_token } = data;

    // 2) Fetch user profile
    const { data: profile } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    // 3) Upsert user in Mongo
    let user = await User.findOne({ email: profile.email });
    if (!user) {
      user = await User.create({
        email:    profile.email,
        name:     profile.name,
        picture:  profile.picture,
        provider: 'google',
      });
    }

    // 4) Sign JWT
    const token = signJwt({ id: user._id, email: user.email });

    // 5) Set cookie & redirect
    const res = NextResponse.redirect(new URL('/dashboard', req.url));
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
      sameSite: 'lax',
    });
    return res;

  } catch (err) {
    console.error('Google OAuth Error:', err);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}

