import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  try {
    await connectToDB();

    // Find the URL document by slug
    const urlEntry = await Url.findOne({ slug });

    if (!urlEntry) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // === Add these lines BEFORE redirecting ===
    urlEntry.clicks = (urlEntry.clicks || 0) + 1;
    urlEntry.lastAccessed = new Date();
    urlEntry.clickHistory = urlEntry.clickHistory || [];
    urlEntry.clickHistory.push(new Date());
    await urlEntry.save();

    // Redirect to original URL
    return NextResponse.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error('[GET /api/links/[slug]]', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}


export async function DELETE(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  try {
    await connectToDB();

    // Extract token from cookies
    const cookie = request.headers.get('cookie') || '';
    const tokenCookie = cookie.split('; ').find((c) => c.startsWith('token='));
    if (!tokenCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = tokenCookie.split('=')[1];

    // Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Find the URL document
    const urlEntry = await Url.findOne({ slug });
    if (!urlEntry) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    // Check if the user owns this link
    if (urlEntry.createdBy.toString() !== decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Delete the URL
    await Url.deleteOne({ slug });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/links/[slug]]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}





