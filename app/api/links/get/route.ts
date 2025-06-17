import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { alias } = await request.json(); // Changed from slug to alias

    if (!alias) {
      return NextResponse.json({ error: 'Alias is required' }, { status: 400 });
    }

    await connectToDB();

    const urlEntry = await Url.findOne({ alias }); // Changed to alias

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
    console.error('GET by alias error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

