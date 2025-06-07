// lib/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyJwt(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return typeof decoded === 'object' && 'userId' in decoded ? (decoded as { userId: string }) : null;
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return null;
  }
}
