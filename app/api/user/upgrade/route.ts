import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';

export async function POST(request: NextRequest) {
  await connectToDB();

  const user = await getUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    user.premium = true;
    await user.save();

    return NextResponse.json({ message: 'Upgraded to premium successfully' }, { status: 200 });
  } catch (error) {
    console.error('[UPGRADE ERROR]', error);
    return NextResponse.json({ error: 'Failed to upgrade user' }, { status: 500 });
  }
}

