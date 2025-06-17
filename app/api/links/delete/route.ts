import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { alias } = await request.json(); // Changed from slug to alias

    if (!alias) {
      return NextResponse.json({ error: 'Alias is required' }, { status: 400 });
    }

    await connectToDB();

    const cookie = request.headers.get('cookie') || '';
    const tokenCookie = cookie.split('; ').find((c) => c.startsWith('token='));
    if (!tokenCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = tokenCookie.split('=')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const urlEntry = await Url.findOne({ alias }); // Changed to alias
    if (!urlEntry) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    if (urlEntry.createdBy.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await Url.deleteOne({ alias }); // Changed to alias

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('DELETE by alias error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

