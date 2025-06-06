import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    await connectToDB();

    const cookie = req.headers.get('cookie') || '';
    const tokenCookie = cookie.split('; ').find((c) => c.startsWith('token='));
    if (!tokenCookie) return NextResponse.json({ links: [] });

    const token = tokenCookie.split('=')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // ✅ Corrected query: match 'createdBy' field
    const links = await Url.find({ createdBy: decoded.userId }).sort({ createdAt: -1 });

    const formatted = links.map((l) => ({
      _id: l._id,
      originalUrl: l.originalUrl,
      alias: l.slug,
      createdAt: l.createdAt,
      clicks: l.clicks || 0,
      lastAccessed: l.lastAccessed || null,
    }));

    return NextResponse.json({ links: formatted });
  } catch (err) {
    console.error('Error fetching links:', err);
    return NextResponse.json({ error: 'Failed to load links' }, { status: 500 });
  }
}

