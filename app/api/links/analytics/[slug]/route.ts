import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const slug = url.pathname.split('/').pop(); // Get the dynamic slug param

    if (!slug) {
      return NextResponse.json({ error: 'Slug not provided' }, { status: 400 });
    }

    const urlEntry = await Url.findOne({ slug });

    if (!urlEntry) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    const clickHistory: Date[] = urlEntry.clickHistory || [];

    const clickCounts = clickHistory.reduce((acc, clickDate) => {
      const date = new Date(clickDate);
      const dateStr = date.toISOString().split('T')[0];
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const clickData = Object.entries(clickCounts)
      .map(([date, count]) => ({ 
        date, 
        count,
        formattedDate: new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(
      { clickData },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}



