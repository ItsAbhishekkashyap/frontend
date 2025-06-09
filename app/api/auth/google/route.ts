import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    console.log("Incoming request:", req.url);
  const redirect_uri = 'https://ashrtl.vercel.app/api/auth/google/callback';
  const client_id = process.env.GOOGLE_CLIENT_ID as string;
  const scope = 'openid email profile';

  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;

  return NextResponse.redirect(url);
}
