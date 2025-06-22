import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { User, IUser } from '@/models/User';
import dns from 'dns/promises';
import { connectToDB } from '@/lib/mongodb';

const CNAME_TARGET = 'cname.branqly.xyz';

// ✅ Type for each custom domain object in User model
export interface CustomDomain {
  domain: string;
  isVerified: boolean;
  cnameTarget?: string;
}

// ✅ Type for incoming request body
export interface VerifyDomainRequestBody {
  domainToVerify: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectToDB();

  const user: IUser | null = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as VerifyDomainRequestBody;

    const domainToVerify = body.domainToVerify?.trim().toLowerCase();

    if (!domainToVerify) {
      return NextResponse.json({ error: 'Domain to verify is required' }, { status: 400 });
    }

    // Fetch full user with customDomains
    const fullUser = await User.findById(user._id).select('customDomains');
    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const customDomains = fullUser.customDomains as CustomDomain[];

    if (!Array.isArray(customDomains) || customDomains.length === 0) {
      return NextResponse.json({ error: 'No custom domains found for user' }, { status: 400 });
    }

    const domainObj = customDomains.find((d) => d.domain === domainToVerify);

    if (!domainObj) {
      return NextResponse.json({ error: 'Domain not found in your list' }, { status: 404 });
    }

    try {
      // DNS CNAME lookup
      const records: string[] = await dns.resolveCname(domainToVerify);

      if (records.length === 0) {
        return NextResponse.json({ verified: false, error: 'No CNAME records found.' }, { status: 400 });
      }

      const expected = CNAME_TARGET.toLowerCase();
      const cnameMatch = records.some((record) => record.toLowerCase() === expected);

      if (cnameMatch) {
        domainObj.isVerified = true;
        await fullUser.save();

        return NextResponse.json({ verified: true, domain: domainToVerify });
      } else {
        return NextResponse.json(
          { verified: false, error: `CNAME mismatch. Found: ${records.join(', ')}` },
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
