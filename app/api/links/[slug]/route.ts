import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  try {
    await connectToDB();

    // 🔍 Find the URL document by slug
    const urlEntry = await Url.findOne({ slug });

    if (!urlEntry) {
      // 🔁 If slug not found, redirect to your 404 or home page
      return NextResponse.redirect(new URL('/', request.url));
    }

    // ✅ Redirect to original URL
    return NextResponse.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error('[GET /api/links/[slug]]', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}




