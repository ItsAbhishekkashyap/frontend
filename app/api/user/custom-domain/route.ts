import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { User } from '@/models/User';
import { connectToDB } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
    await connectToDB();

    const user = await getUserFromRequest(req);

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // fetch latest user data from DB
    const fullUser = await User.findById(user._id).select('customDomains premium');

    if (!fullUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

   return NextResponse.json({
    customDomain: fullUser.customDomain || null,
    isDomainVerified: fullUser.isDomainVerified || false,
    premium: fullUser.premium,
    customDomains: fullUser.customDomains || [] // 🚀 Added this!
  });
}

