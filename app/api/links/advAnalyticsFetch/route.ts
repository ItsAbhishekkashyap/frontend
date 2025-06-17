import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Link from '@/models/Link';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { alias } = await req.json();

    if (!alias) {
      return NextResponse.json({ error: 'Alias is required' }, { status: 400 });
    }

    const found = await Link.findOne({ alias });

    if (!found) {
      return NextResponse.json({ error: 'Alias not found' }, { status: 404 });
    }

    return NextResponse.json({
      alias: found.alias,
      clickDetails: found.clickDetails || [],
    });

  } catch (error) {
    console.error('Error fetching advanced analytics:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


