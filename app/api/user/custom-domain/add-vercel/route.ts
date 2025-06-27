

import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { connectToDB } from '@/lib/mongodb';
import dns from 'dns/promises'; 

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN!;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID!;

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const user = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.premium) {
      return NextResponse.json({ error: 'Upgrade to premium to use custom domains.' }, { status: 403 });
    }

    const { customDomain } = await req.json();
    if (!customDomain || typeof customDomain !== 'string') {
      return NextResponse.json({ error: 'Invalid domain provided.' }, { status: 400 });
    }

    let isVerified = false;
    let cnameTarget = '';

    if (customDomain.endsWith('.branqly.xyz')) {
      // ✅ Our own domain — use Vercel API
      const vercelRes = await fetch(`https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: customDomain })
      });

      const vercelData = await vercelRes.json();

      if (!vercelRes.ok) {
        console.error('Vercel API Error:', vercelData);
        return NextResponse.json({ error: 'Failed to add domain to Vercel.', details: vercelData }, { status: 500 });
      }

      isVerified = true; // Vercel handles SSL, routing
    } else {
      // ✅ User's own domain — Check CNAME pointing to cname.branqly.xyz
      try {
        const records = await dns.resolveCname(customDomain);
        console.log(`DNS CNAME for ${customDomain}:`, records);

        // You expect CNAME to point to your branqly system:
        if (records.some(r => r.includes('cname.branqly.xyz'))) {
          isVerified = true;
          cnameTarget = 'cname.branqly.xyz';
        } else {
          return NextResponse.json({ error: 'CNAME record does not point to cname.branqly.xyz.' }, { status: 400 });
        }
      } catch (dnsErr) {
        console.error('DNS Lookup Error:', dnsErr);
        return NextResponse.json({ error: 'Failed to resolve CNAME record for this domain.' }, { status: 400 });
      }
    }

    // ✅ Save to DB
    user.customDomains = user.customDomains || [];
    user.customDomains.push({ domain: customDomain, isVerified, cnameTarget });
    await user.save();

    return NextResponse.json({
      success: true,
      message: `Domain ${customDomain} added and ${isVerified ? 'verified' : 'pending verification'}.`,
    });

  } catch (error) {
    console.error('Domain Add Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
