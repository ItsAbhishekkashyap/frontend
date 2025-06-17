import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { UAParser } from 'ua-parser-js';

const IPINFO_TOKEN = process.env.IPINFO_TOKEN || "";

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

    // Parse user-agent for device type
    const userAgent = req.headers.get('user-agent') || '';
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();
    const device = uaResult.device.type || 'Desktop';

    // Extract IP from x-forwarded-for
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(",")[0].trim() : "unknown";

    // Default geo info
    let geoInfo = { country: 'Unknown', region: 'Unknown', city: 'Unknown' };

    // Fetch geo info if possible
    if (IPINFO_TOKEN && ip !== "unknown") {
      try {
        const response = await fetch(`https://ipinfo.io/${ip}/json?token=${IPINFO_TOKEN}`);
        if (response.ok) {
          const data = await response.json();
          geoInfo = {
            country: data.country || 'Unknown',
            region: data.region || 'Unknown',
            city: data.city || 'Unknown',
          };
        }
      } catch (err) {
        console.error('IPInfo fetch failed:', err);
      }
    }

    // Record the analytics
    const clickDetail = {
      timestamp: new Date(),
      ip,
      device,
      ...geoInfo
    };

    found.clickDetails.push(clickDetail);
    await found.save();

    return NextResponse.json({ message: 'Analytics recorded successfully' });

  } catch (error) {
    console.error('Analytics logging error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


