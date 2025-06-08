import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

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
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow static files and public paths
  if (PUBLIC_FILE.test(pathname) || PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Get token from cookies
  const token = req.cookies.get('token')?.value;

  if (!token) {
    console.log('No token found — redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // ✅ Verify token (no need to extract payload if unused)
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); // Token valid — allow request
  } catch (err) {
    console.error('JWT verification failed:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// ✅ Match all routes except static files and public paths
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};




