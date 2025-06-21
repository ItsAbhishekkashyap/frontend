import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { User, IUser } from '@/models/User';
import dns from 'dns/promises';
import { connectToDB } from '@/lib/mongodb';

interface CustomDomain {
  domain: string;
  isVerified: boolean;
  cnameTarget?: string;
}

interface VerifyDomainRequestBody {
  domainToVerify: string;
}

const CNAME_TARGET = 'cname.branqly.xyz';

export async function POST(req: NextRequest) {
  await connectToDB();

  const user: IUser | null = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: VerifyDomainRequestBody = await req.json();

    let domainToVerify = body.domainToVerify;
    if (!domainToVerify || typeof domainToVerify !== 'string') {
      return NextResponse.json({ error: 'Domain to verify is required' }, { status: 400 });
    }
    domainToVerify = domainToVerify.trim().toLowerCase();

    const fullUser = await User.findById(user._id).select('customDomains');
    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!Array.isArray(fullUser.customDomains) || fullUser.customDomains.length === 0) {
      return NextResponse.json({ error: 'No custom domains found for user' }, { status: 400 });
    }

    const customDomains = fullUser.customDomains as CustomDomain[];

    const domainObj = customDomains.find((d: CustomDomain) => d.domain === domainToVerify);

    if (!domainObj) {
      return NextResponse.json({ error: 'Domain not found in your list' }, { status: 404 });
    }

    try {
      // Perform DNS CNAME lookup
      const records: string[] = await dns.resolveCname(domainToVerify);

      if (!records.length) {
        return NextResponse.json({ verified: false, error: 'No CNAME records found.' }, { status: 400 });
      }

      const cnameTargetLower = CNAME_TARGET.toLowerCase();
      const foundValidCname = records.some((r) => r.toLowerCase() === cnameTargetLower);

      if (foundValidCname) {
        // Mark domain as verified
        domainObj.isVerified = true;
        await fullUser.save();

        return NextResponse.json({ verified: true, domain: domainToVerify });
      } else {
        return NextResponse.json(
          {
            verified: false,
            error: `CNAME mismatch. Found: ${records.join(', ')}`,
          },
          { status: 400 }
        );
      }
    } catch (dnsError) {
      console.error('DNS lookup error:', dnsError);
      return NextResponse.json({ verified: false, error: 'DNS lookup failed.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
