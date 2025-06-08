// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongodb';
// import { Url } from '@/models/Url';

// export async function GET(
//   req: NextRequest,
//   context: { params: { shortId: string } }
// ) {
//   try {
//     await connectToDB();
//     const { shortId } = context.params;

//     const found = await Url.findOne({ slug: shortId });

//     if (!found) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     // Update analytics
//     found.clicks = (found.clicks || 0) + 1;
//     found.lastAccessed = new Date();
//     found.clickHistory.push(new Date());
//     await found.save();

//     return NextResponse.redirect(found.originalUrl);
//   } catch (error) {
//     console.error('Redirect error:', error);
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    // Get slug from pathname (e.g., /abc123)
    const pathname = req.nextUrl.pathname;
    const shortId = pathname.split('/').pop(); // gets the last part of the URL

    if (!shortId) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const found = await Url.findOne({ slug: shortId });

    if (!found) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Update analytics
    found.clicks = (found.clicks || 0) + 1;
    found.lastAccessed = new Date();
    found.clickHistory.push(new Date());
    await found.save();

    return NextResponse.redirect(found.originalUrl);
  } catch (error) {
    console.error('Redirect error:', error);
    return NextResponse.redirect(new URL('/', req.url));
  }
}










