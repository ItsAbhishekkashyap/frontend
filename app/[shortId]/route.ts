// // ✅ app/[shortId]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongodb';
// import { Url } from '@/models/Url';

// export async function GET(req: NextRequest) {
//   try {
//     await connectToDB();

//     const shortId = req.nextUrl.pathname.split('/').pop(); // Extract from the path

//     if (!shortId) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     const found = await Url.findOne({ slug: shortId });

//     if (!found) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     found.clicks = (found.clicks || 0) + 1;
//     found.lastAccessed = new Date();
//     found.clickHistory.push(new Date());
//     await found.save();

//     return NextResponse.redirect(found.originalUrl);
//   } catch (error) {
//     console.error('Redirect error:', error);
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// }





import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import Link from '@/models/Link';
import { UAParser } from 'ua-parser-js';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const shortId = req.nextUrl.pathname.split('/').pop(); // Extract alias from URL

    if (!shortId) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const found = await Link.findOne({ alias: shortId }); // Use Link model and alias field

    if (!found) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Increment click count
    found.clickCount = (found.clickCount || 0) + 1;

    // User-Agent Parsing
    const userAgent = req.headers.get('user-agent') || '';
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    const device = uaResult.device.type || 'Desktop';

    // IP Extraction
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

    // Fetch Location Info (Optional)
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

    // Redirect to original URL
    return NextResponse.redirect(found.originalUrl);

  } catch (error) {
    console.error('Redirect error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}
