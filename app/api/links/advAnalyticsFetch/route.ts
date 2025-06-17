import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { alias } = await req.json();

    if (!alias) {
      return NextResponse.json({ error: 'Alias is required' }, { status: 400 });
    }

    const found = await Url.findOne({ alias });

    if (!found) {
      return NextResponse.json({ error: 'Alias not found' }, { status: 404 });
    }

    // Return only the relevant fields for advanced analytics
    return NextResponse.json({
      alias: found.alias,
      totalClicks: found.clicks || 0,
      lastAccessed: found.lastAccessed || null,
      clickDetails: found.clickDetails || [],
    });

  } catch (error) {
    console.error('Error fetching advanced analytics:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}





