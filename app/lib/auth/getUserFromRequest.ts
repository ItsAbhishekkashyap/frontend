import jwt from 'jsonwebtoken';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getUserFromRequest(req: Request) {
  try {
    // For NextRequest in next/server, use req.cookies.get()
    // For standard Request, you must parse cookies manually:
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => {
      const [key, ...v] = c.split('=');
      return [key, decodeURIComponent(v.join('='))];
    }));

    const token = cookies.token; // assuming you named your cookie 'token'
    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    console.error('getUserFromRequest error:', error);
    return null;
  }
}

