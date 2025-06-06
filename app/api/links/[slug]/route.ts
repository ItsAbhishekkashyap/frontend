import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const { params } = context; // ✅ Access params from awaited context
  const { slug } = params;

  try {
    await connectToDB();

    const urlEntry = await Url.findOne({ slug });

    if (!urlEntry) {
      return NextResponse.json({ error: 'Slug not found' }, { status: 404 });
    }

    return NextResponse.json({ originalUrl: urlEntry.originalUrl });
  } catch (error) {
    console.error('[GET /api/links/[slug]]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}



