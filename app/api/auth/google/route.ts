// /app/api/auth/google/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL!,
    client_id: process.env.GOOGLE_CLIENT_ID!, // server-side var
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'openid',
      'email',
      'profile',
    ].join(' '),
  };

  const params = new URLSearchParams(options);
  const url = `${rootUrl}?${params.toString()}`;

  return NextResponse.redirect(url);
}

