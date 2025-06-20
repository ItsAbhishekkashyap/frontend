import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { connectToDB } from '@/lib/mongodb';


export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { domain } = await req.json();
    if (!domain) return NextResponse.json({ error: 'Domain is required' }, { status: 400 });

    const checkUrl = `https://${domain}/branqly-health-check`;

    const res = await fetch(checkUrl, { method: 'HEAD' });

    if (res.status === 200) {
      // Correctly update that specific domain's verified status
      const updatedRootDomains = user.rootDomains?.map((d: { domain: string, verified: boolean }) => {
        if (d.domain === domain) {
          return { ...d, verified: true };
        }
        return d;
      });

      user.rootDomains = updatedRootDomains;
      await user.save();

      return NextResponse.json({ message: 'Domain verified successfully', rootDomains: user.rootDomains });
    } else {
      return NextResponse.json({ error: 'Health check failed' }, { status: 400 });
    }

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
