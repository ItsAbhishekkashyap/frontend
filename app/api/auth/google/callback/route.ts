// /app/api/auth/google/callback/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!;
  const client_id = process.env.GOOGLE_CLIENT_ID!;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET!;

  if (!code) {
    return NextResponse.json({ error: 'No code in URL' }, { status: 400 });
  }

  try {
    // Exchange code for tokens
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const { id_token, access_token } = data;

    // Fetch user profile
    const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const user = userInfoRes.data;

    // Return user info (for dev only — in prod, create JWT or session here)
    return NextResponse.json({ user, id_token, access_token });
  } catch (error) {
    console.error('Google OAuth Error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
