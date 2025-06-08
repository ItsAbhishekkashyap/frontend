// ✅ app/[shortId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const shortId = req.nextUrl.pathname.split('/').pop(); // Extract from the path

    if (!shortId) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const found = await Url.findOne({ slug: shortId });

    if (!found) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    found.clicks = (found.clicks || 0) + 1;
    found.lastAccessed = new Date();
    found.clickHistory.push(new Date());
    await found.save();

    return NextResponse.redirect(found.originalUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}











