import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    // ✅ Extract slug from the URL like this:
    const url = new URL(request.url);
    const slug = url.pathname.split('/').pop();

    if (!slug) {
      return NextResponse.json({ error: 'Slug not provided' }, { status: 400 });
    }

    const urlEntry = await Url.findOne({ slug });

    if (!urlEntry) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    const clickHistory: Date[] = urlEntry.clickHistory || [];

    const clickCounts: Record<string, number> = {};

    clickHistory.forEach((clickDate) => {
      const date = new Date(clickDate);
      const dateStr = date.toISOString().split('T')[0];
      clickCounts[dateStr] = (clickCounts[dateStr] || 0) + 1;
    });

    const clickData = Object.entries(clickCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({ clickData });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
