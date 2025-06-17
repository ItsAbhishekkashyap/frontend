import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { UAParser } from 'ua-parser-js';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { alias } = await req.json();  // changed from slug to alias

    if (!alias) {
      return NextResponse.json({ error: 'Alias is required' }, { status: 400 });
    }

    const found = await Url.findOne({ alias });

    if (!found) {
      return NextResponse.json({ error: 'Alias not found' }, { status: 404 });
    }

    const userAgent = req.headers.get('user-agent') || '';
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();
    const device = uaResult.device.type || 'Desktop';

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

    let country = 'Unknown';
    let region = 'Unknown';
    let city = 'Unknown';

    try {
      const response = await fetch(`https://ipinfo.io/${ip}?token=e1c28e555bd2c8`);
      const data = await response.json();
      country = data.country || 'Unknown';
      region = data.region || 'Unknown';
      city = data.city || 'Unknown';
    } catch (err) {
      console.error('IP Info fetch failed:', err);
    }

    found.clickDetails.push({
      timestamp: new Date(),
      country,
      region,
      city,
      device,
      ip,
    });

    await found.save();

    return NextResponse.json({ message: 'Analytics recorded successfully' });

  } catch (error) {
    console.error('Analytics logging error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

