

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Url } from "@/models/Url";

const IPINFO_TOKEN = process.env.IPINFO_TOKEN || "";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const alias = req.nextUrl.pathname.slice(1);
    if (!alias) return NextResponse.redirect(new URL("/", req.url));

    // Clean host header - remove port and lowercase
    const hostHeader = req.headers.get("host") || "";
    const host = hostHeader.split(":")[0].toLowerCase();

    if (!host) {
      console.warn("Host header missing");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Try to find exact match with alias + domainUsed
    let urlDoc = await Url.findOne({ alias, domainUsed: host });

    // If not found, try toggling www. prefix (fallback)
    if (!urlDoc) {
      let fallbackHost = "";
      if (host.startsWith("www.")) {
        fallbackHost = host.slice(4);
      } else {
        fallbackHost = "www." + host;
      }

      console.log(`URL not found for ${alias}@${host}, trying fallback domain: ${fallbackHost}`);
      urlDoc = await Url.findOne({ alias, domainUsed: fallbackHost });
    }

    if (!urlDoc) {
      console.warn(`No URL found for alias: ${alias} with domainUsed: ${host} or fallback`);
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Extract IP and User-Agent
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const ip = xForwardedFor ? xForwardedFor.split(",")[0].trim() : "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Geo info default
    let geoInfo = { country: "Unknown", region: "Unknown", city: "Unknown" };

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

    // Track click details
    const clickDetail = {
      timestamp: new Date(),
      ip,
      device: userAgent,
      ...geoInfo,
    };

    urlDoc.clicks = (urlDoc.clicks || 0) + 1;
    urlDoc.lastAccessed = new Date();
    urlDoc.clickHistory.push(new Date());
    urlDoc.clickDetails.push(clickDetail);

    await urlDoc.save();

    return NextResponse.redirect(urlDoc.originalUrl);
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
