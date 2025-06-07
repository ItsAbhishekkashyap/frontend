import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectToDB();

    const { slug } = params;

    const urlEntry = await Url.findOne({ slug });

    if (!urlEntry) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    // Extract clickHistory (an array of Date)
    const clickHistory: Date[] = urlEntry.clickHistory || [];

    // Group clicks by date in 'YYYY-MM-DD' format
    const clickCounts: Record<string, number> = {};

    clickHistory.forEach((clickDate) => {
      const date = new Date(clickDate);
      const dateStr = date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      clickCounts[dateStr] = (clickCounts[dateStr] || 0) + 1;
       
    });



    // Convert grouped data into array sorted by date
    const clickData = Object.entries(clickCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json({ clickData });
       
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

