import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

type ClickDetail = {
  timestamp: Date | string;
  country?: string;
  region?: string;
  city?: string;
  device?: string;
  ip?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    await connectToDB();

    const linkEntry = await Url.findOne({ slug });

    if (!linkEntry) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const clickHistory: unknown[] = linkEntry.clickHistory || [];

    const formattedClickDetails = clickHistory.map((detail) => {
      if (detail instanceof Date) {
        return {
          timestamp: detail.toISOString(),
          country: '-',
          region: '-',
          city: '-',
          device: '-',
          ip: '-',
        };
      }

      const properDetail = detail as Partial<ClickDetail>;

      return {
        timestamp: properDetail.timestamp
          ? new Date(properDetail.timestamp).toISOString()
          : '-',
        country: properDetail.country || '-',
        region: properDetail.region || '-',
        city: properDetail.city || '-',
        device: properDetail.device || '-',
        ip: properDetail.ip || '-',
      };
    });

    return NextResponse.json({
      originalUrl: linkEntry.originalUrl,
      clickCount: linkEntry.clicks || 0,
      clickDetails: formattedClickDetails,
    });
  } catch (error) {
    console.error('Details fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

