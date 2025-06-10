// lib/jwt.ts
// app/lib/jwt.ts
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('⚠️ Please define JWT_SECRET in your .env.local');
}

export interface JWTPayload {
  id: string;
  email: string;
}

// Sign a new JWT with `{ id, email }` and 7d expiry
export function signJwt(payload: JWTPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

// Verify and return the payload, or null if invalid
export function verifyJwt(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === 'object' && decoded && 'id' in decoded && 'email' in decoded) {
      return decoded as JWTPayload;
    }
    return null;
  } catch (err) {
    console.error('❌ JWT verification error:', err);
    return null;
  }
}
