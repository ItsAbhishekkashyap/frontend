import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { User, IUser } from '@/models/User';
import { connectToDB } from '@/lib/mongodb';

type CustomDomain = {
  domain: string;
  isVerified: boolean;
  cnameTarget?: string;
};

interface UpdateDomainRequestBody {
  customDomain: string;
}

export async function POST(req: NextRequest) {
  await connectToDB();

  const user = (await getUserFromRequest(req)) as IUser | null;
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: UpdateDomainRequestBody = await req.json();

    let { customDomain } = body;

    if (!customDomain || typeof customDomain !== 'string') {
      return NextResponse.json({ error: 'Invalid domain' }, { status: 400 });
    }

    customDomain = customDomain.trim().toLowerCase();

    const fullUser = await User.findById(user._id).select('customDomains');
    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const domainExists = fullUser.customDomains?.some(
      (d: CustomDomain) => d.domain === customDomain
    );

    if (domainExists) {
      return NextResponse.json({ error: 'Domain already exists in your list' }, { status: 409 });
    }

    fullUser.customDomains = fullUser.customDomains || [];
    fullUser.customDomains.push({
      domain: customDomain,
      isVerified: false,
      cnameTarget: 'cname.branqly.xyz',
    });

    await fullUser.save();

    return NextResponse.json({
      message: 'Custom domain added. Please verify DNS.',
      customDomains: fullUser.customDomains,
    });
  } catch (error) {
    console.error('Error updating custom domain:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}




