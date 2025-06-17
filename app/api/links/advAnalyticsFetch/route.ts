import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { alias, page = 1, limit = 50 } = await req.json(); // page & limit received from frontend

    if (!alias) {
      return NextResponse.json({ error: 'Alias is required' }, { status: 400 });
    }

    const found = await Url.findOne({ alias });

    if (!found) {
      return NextResponse.json({ error: 'Alias not found' }, { status: 404 });
    }

    // Pagination logic
    const skip = (page - 1) * limit;
    const totalClicks = found.clickDetails.length;

    const slicedClicks = found.clickDetails.slice(skip, skip + limit);

    return NextResponse.json({
      alias: found.alias,
      totalClicks,
      lastAccessed: found.lastAccessed || null,
      clickDetails: slicedClicks,
    });

  } catch (error) {
    console.error('Error fetching advanced analytics:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}





