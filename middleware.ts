import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;
const PUBLIC_FILE = /\.(.*)$/;

const PUBLIC_PATHS = [
  '/', 
  '/login', 
  '/signup', 
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/links/create',
  '/features',
  '/blog',
  '/pricing',
  '/guides',
  '/documentation',
  '/about',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/refund-policy',
  '/contact-us',
  '/Shipping-and-Delivery'

];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname) || PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret); // This will throw if invalid

    return NextResponse.next(); // ✅ valid token
  } catch (err) {
    console.error('JWT verification failed:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// ✅ Matcher config
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};





