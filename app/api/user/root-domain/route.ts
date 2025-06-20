import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import {User} from '@/models/User';
import Link from '@/models/Link';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    const path = searchParams.get('path')?.replace(/^\/+/, ''); // remove leading slash

    if (!domain || !path) {
      return NextResponse.json({ error: 'Missing domain or path' }, { status: 400 });
    }

    // Find user who has this verified domain
    const user = await User.findOne({
      rootDomains: {
        $elemMatch: { domain, verified: true },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Domain not verified or not found' }, { status: 404 });
    }

    // Find the link with the alias
    const link = await Link.findOne({ alias: path, userId: user._id });

    if (!link) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    // Redirect to original URL
    return NextResponse.redirect(link.originalUrl);

  } catch (error) {
    console.error('Root Domain Routing Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

