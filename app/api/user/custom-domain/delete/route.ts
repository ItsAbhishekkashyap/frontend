import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { User, IUser } from '@/models/User';
import { connectToDB } from '@/lib/mongodb';

interface DeleteDomainRequestBody {
  domainToDelete: string;
}

interface CustomDomain {
  domain: string;
  isVerified: boolean;
  cnameTarget?: string;
}

export async function DELETE(req: NextRequest) {
  await connectToDB();

  const user: IUser | null = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: DeleteDomainRequestBody = await req.json();
    const { domainToDelete } = body;

    if (!domainToDelete || typeof domainToDelete !== 'string') {
      return NextResponse.json({ error: 'Domain to delete is required' }, { status: 400 });
    }

    const fullUser = await User.findById(user._id);
    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Ensure customDomains exists and is an array
    if (!Array.isArray(fullUser.customDomains)) {
      return NextResponse.json({ error: 'User has no custom domains.' }, { status: 400 });
    }

    // Filter with proper type
    fullUser.customDomains = (fullUser.customDomains as CustomDomain[]).filter(
      (domainObj: CustomDomain) => domainObj.domain !== domainToDelete
    );

    await fullUser.save();

    return NextResponse.json({ success: true, message: 'Domain deleted successfully.' });

  } catch (error) {
    console.error('Delete domain error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

