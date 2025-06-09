import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const redirect_uri = 'https://ashrtl.vercel.app/api/auth/google/callback';
  const client_id = process.env.GOOGLE_CLIENT_ID as string;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET as string;

  try {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const { id_token, access_token } = data;

    // Decode user info from id_token if needed
    // const userInfo = jwt.decode(id_token);

    return NextResponse.json({ id_token, access_token });
  } catch (error) {
    console.error('Google OAuth Error:', error);
    return NextResponse.json({ error: 'Failed to authenticate user.' });
  }
}
