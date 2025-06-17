import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Link from '@/models/Link';
import { UAParser } from 'ua-parser-js';

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { alias } = await req.json(); // client must send alias

    if (!alias) {
      return NextResponse.json({ error: 'Alias is required' }, { status: 400 });
    }

    const found = await Link.findOne({ alias });

    if (!found) {
      return NextResponse.json({ error: 'Alias not found' }, { status: 404 });
    }

    // User-Agent Parsing
    const userAgent = req.headers.get('user-agent') || '';
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();
    const device = uaResult.device.type || 'Desktop';

    // IP Extraction
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

    // Fetch Location Info
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

    // Push to clickDetails array
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
