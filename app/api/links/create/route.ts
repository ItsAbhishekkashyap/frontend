// app/api/links/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {connectToDB} from '@/lib/mongodb';
import {Url} from '@/models/Url';

// Utility function to generate slug (random string)
function generateSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { originalUrl } = await request.json();

    if (!originalUrl || typeof originalUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Check if URL already exists
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return NextResponse.json({ slug: existing.slug }, { status: 200 });
    }

    // Create new short url with slug
    let slug = generateSlug();
    // Make sure slug is unique
    while (await Url.findOne({ slug })) {
      slug = generateSlug();
    }

    const newUrl = new Url({ originalUrl, slug });
    await newUrl.save();

    return NextResponse.json({ slug }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

