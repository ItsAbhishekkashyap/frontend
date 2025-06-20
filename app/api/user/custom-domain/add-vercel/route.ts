import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';


const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN!;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID!;


export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only premium users can use this feature
    if (!user.premium) {
      return NextResponse.json({ error: 'Upgrade to premium to use custom domains.' }, { status: 403 });
    }

    const { customDomain } = await req.json();

    if (!customDomain) {
      return NextResponse.json({ error: 'Custom domain is required.' }, { status: 400 });
    }

    // Call Vercel Domains API to add the domain
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
      return NextResponse.json({ error: 'Failed to add domain to Vercel.', details: vercelData }, { status: 500 });
    }

    // Save domain info in MongoDB (User model)
    user.customDomain = customDomain;
    user.isDomainVerified = false; // default — DNS not yet verified
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Domain added to Vercel successfully. Please configure your DNS and verify.',
      vercelData
    });
  } catch (error) {
    console.error('Custom Domain Add Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
