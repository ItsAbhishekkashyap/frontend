// ✅ app/[alias]/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { connectToDB } from "@/lib/mongodb";
// import { Url } from "@/models/Url";

// export async function GET(req: NextRequest) {
//   try {
//     await connectToDB();

//     const alias = req.nextUrl.pathname.slice(1); // removes leading '/'
//     if (!alias) return NextResponse.redirect(new URL("/", req.url));

//     const urlDoc = await Url.findOne({ alias });
//     if (!urlDoc) return NextResponse.redirect(new URL("/", req.url));

//     // Visitor info
//     const ip = req.headers.get("x-forwarded-for") || "unknown";

//     const userAgent = req.headers.get("user-agent") || "unknown";

//     // TODO: Use a geoip lookup service to get country, region, city from IP
//     const geoInfo = { country: "Unknown", region: "Unknown", city: "Unknown" };

//     const deviceInfo = userAgent; // or parse userAgent for device type

//     // Update Url document
//     urlDoc.clicks = (urlDoc.clicks || 0) + 1;
//     urlDoc.lastAccessed = new Date();
//     urlDoc.clickHistory.push(new Date());

//     urlDoc.clickDetails.push({
//       timestamp: new Date(),
//       ip,
//       device: deviceInfo,
//       ...geoInfo,
//     });

//     await urlDoc.save();

//     return NextResponse.redirect(urlDoc.originalUrl);
//   } catch (error) {
//     console.error("Redirect error:", error);
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }

// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongodb';
// import Link from '@/models/Link';
// import { UAParser } from 'ua-parser-js';

// export async function GET(req: NextRequest) {
//   try {
//     await connectToDB();

//     const shortId = req.nextUrl.pathname.split('/').pop(); // Extract alias from URL

//     if (!shortId) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     const found = await Link.findOne({ alias: shortId }); // Use Link model and alias field

//     if (!found) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     // Increment click count
//     found.clickCount = (found.clickCount || 0) + 1;

//     // User-Agent Parsing
//     const userAgent = req.headers.get('user-agent') || '';
//     const parser = new UAParser(userAgent);
//     const uaResult = parser.getResult();

//     const device = uaResult.device.type || 'Desktop';

//     // IP Extraction
//     const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

//     // Fetch Location Info (Optional)
//     let country = 'Unknown';
//     let region = 'Unknown';
//     let city = 'Unknown';

//     try {
//       const response = await fetch(`https://ipinfo.io/${ip}?token=e1c28e555bd2c8`);
//       const data = await response.json();
//       country = data.country || 'Unknown';
//       region = data.region || 'Unknown';
//       city = data.city || 'Unknown';
//     } catch (err) {
//       console.error('IP Info fetch failed:', err);
//     }

//     // Push to clickDetails array
//     found.clickDetails.push({
//       timestamp: new Date(),
//       country,
//       region,
//       city,
//       device,
//       ip,
//     });

//     await found.save();

//     // Redirect to original URL
//     console.log('Redirecting to:', found.originalUrl);
//     return NextResponse.redirect(found.originalUrl);

//   } catch (error) {
//     console.error('Redirect error:', error);
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// }



// app/[alias]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Url } from "@/models/Url";

const IPINFO_TOKEN = process.env.IPINFO_TOKEN || "";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    // Extract alias from URL path (removes leading '/')
    const alias = req.nextUrl.pathname.slice(1);
    if (!alias) return NextResponse.redirect(new URL("/", req.url));

    // Find URL doc by alias
    const urlDoc = await Url.findOne({ alias });
    if (!urlDoc) return NextResponse.redirect(new URL("/", req.url));

    // Extract IP address from headers (x-forwarded-for or connection remoteAddress)
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const ip = xForwardedFor ? xForwardedFor.split(",")[0].trim() : "unknown";

    // Get user agent
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Default geo info in case fetch fails or no token
    let geoInfo = { country: "Unknown", region: "Unknown", city: "Unknown" };

    // Fetch geo info from ipinfo.io if token and ip available
    if (IPINFO_TOKEN && ip !== "unknown") {
      try {
        const response = await fetch(`https://ipinfo.io/${ip}/json?token=${IPINFO_TOKEN}`);
        if (response.ok) {
          const data = await response.json();
          geoInfo = {
            country: data.country || "Unknown",
            region: data.region || "Unknown",
            city: data.city || "Unknown",
          };
        }
      } catch (error) {
        console.warn("IPInfo fetch failed:", error);
      }
    }

    // Create click detail record
    const clickDetail = {
      timestamp: new Date(),
      ip,
      device: userAgent,
      ...geoInfo,
    };

    // Update URL document atomically
    urlDoc.clicks = (urlDoc.clicks || 0) + 1;
    urlDoc.lastAccessed = new Date();
    urlDoc.clickHistory.push(new Date());
    urlDoc.clickDetails.push(clickDetail);

    await urlDoc.save();

    // Redirect to original URL
    return NextResponse.redirect(urlDoc.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
