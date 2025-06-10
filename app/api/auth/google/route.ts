import { NextResponse } from 'next/server';
import { googleOAuthURL } from '@/lib/google';

export async function GET() {
  return NextResponse.redirect(googleOAuthURL);
}


