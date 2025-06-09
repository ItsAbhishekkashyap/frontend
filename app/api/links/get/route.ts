import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    await connectToDB();

    const urlEntry = await Url.findOne({ slug });

    if (!urlEntry) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    urlEntry.clicks = (urlEntry.clicks || 0) + 1;
    urlEntry.lastAccessed = new Date();
    urlEntry.clickHistory = urlEntry.clickHistory || [];
    urlEntry.clickHistory.push(new Date());
    await urlEntry.save();

    return NextResponse.json({ redirect: urlEntry.originalUrl });
  } catch (error) {
    console.error('GET by slug error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
