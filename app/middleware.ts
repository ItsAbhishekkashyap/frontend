import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_PATHS = ['/', '/login', '/signup', '/api/auth/login', '/api/auth/signup', '/api/auth/forgot-password', '/api/auth/reset-password'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public files (images, fonts, etc.) and public paths without auth
  if (
    PUBLIC_FILE.test(pathname) ||
    PUBLIC_PATHS.some(path => pathname.startsWith(path))
  ) {
    // If user is authenticated and visiting login/signup page, redirect to homepage
    if ((pathname === '/login' || pathname === '/signup') && hasValidToken(req)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  // For other routes: protect them (require auth)
  if (!hasValidToken(req)) {
    // Redirect to login if no valid token
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

function hasValidToken(req: NextRequest): boolean {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return false;
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// Specify paths where this middleware should run
export const config = {
  matcher: [
    /*
      Match all paths except for _next/static, _next/image, favicon.ico, and api/auth/logout if needed
      You can customize the matcher as per your routes
    */
    '/((?!api/auth/logout|_next/static|_next/image|favicon.ico).*)',
  ],
};
