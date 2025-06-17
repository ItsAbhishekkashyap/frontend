// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/lib/mongodb';
// import { Url } from '@/models/Url';
// import { User } from '@/models/User';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// function generateSlug(length = 6) {
//   const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let slug = '';
//   for (let i = 0; i < length; i++) {
//     slug += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return slug;
// }

// export async function POST(request: NextRequest) {
//   try {
//     await connectToDB();
//     const { originalUrl, customAlias } = await request.json();

//     if (!originalUrl || typeof originalUrl !== 'string') {
//       return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
//     }

//     // Attempt to extract and verify token (optional)
//     let user = null;
//     const token =
//       request.cookies.get('token')?.value ||
//       request.headers.get('Authorization')?.replace('Bearer ', '');

//     if (token) {
//       try {
//         const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
//         user = await User.findById(payload.userId);
//       } catch (err) {
//         console.error('Error verifying token:', err);
//         console.warn('Invalid token, proceeding as anonymous user.');
//       }
//     }

//     // Custom alias only for premium users
//     let slug = '';
//     if (customAlias) {
//       if (!user || !user.premium) {
//         return NextResponse.json(
//           { error: 'Only premium users can create custom aliases' },
//           { status: 403 }
//         );
//       }

//       const aliasRegex = /^[a-zA-Z0-9_-]{3,30}$/;
//       if (!aliasRegex.test(customAlias)) {
//         return NextResponse.json({ error: 'Custom alias invalid format' }, { status: 400 });
//       }

//       const exists = await Url.findOne({ slug: customAlias });
//       if (exists) {
//         return NextResponse.json({ error: 'Custom alias already taken' }, { status: 409 });
//       }

//       slug = customAlias;
//     } else {
//       // Auto-generate slug
//       slug = generateSlug();
//       while (await Url.findOne({ slug })) {
//         slug = generateSlug();
//       }
//     }

//     const newUrl = await Url.create({
//       originalUrl,
//       slug,
//       createdBy: user?._id || null,
//       createdAt: new Date(),
//       clicks: 0,
//       lastAccessed: null,
//     });

//     return NextResponse.json(
//       {
//         _id: newUrl._id,
//         originalUrl: newUrl.originalUrl,
//         slug: newUrl.slug,
//         createdAt: newUrl.createdAt,
//         clicks: newUrl.clicks,
//         lastAccessed: newUrl.lastAccessed,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error in /api/links/create:', error);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }




import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { User } from '@/models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

function generateAlias(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let alias = '';
  for (let i = 0; i < length; i++) {
    alias += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return alias;
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { originalUrl: rawOriginalUrl, customAlias } = await request.json();

    if (!rawOriginalUrl || typeof rawOriginalUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    let originalUrl = rawOriginalUrl.trim();
    if (!/^https?:\/\//i.test(originalUrl)) {
      originalUrl = 'https://' + originalUrl;
    }

    // Attempt to extract and verify token (optional)
    let user = null;
    const token =
      request.cookies.get('token')?.value ||
      request.headers.get('Authorization')?.replace('Bearer ', '');

    if (token) {
      try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        user = await User.findById(payload.userId);
      } catch (err) {
        console.error('Error verifying token:', err);
        console.warn('Invalid token, proceeding as anonymous user.');
      }
    }

    let alias = '';
    if (customAlias) {
      if (!user || !user.premium) {
        return NextResponse.json(
          { error: 'Only premium users can create custom aliases' },
          { status: 403 }
        );
      }

      const aliasRegex = /^[a-zA-Z0-9_-]{3,30}$/;
      if (!aliasRegex.test(customAlias)) {
        return NextResponse.json({ error: 'Custom alias invalid format' }, { status: 400 });
      }

      const exists = await Url.findOne({ alias: customAlias });
      if (exists) {
        return NextResponse.json({ error: 'Custom alias already taken' }, { status: 409 });
      }

      alias = customAlias;
    } else {
      alias = generateAlias();
      while (await Url.findOne({ alias })) {
        alias = generateAlias();
      }
      console.log('Creating URL with alias:', alias);

    }

    const newUrl = await Url.create({
      originalUrl,
      alias,
      createdBy: user?._id || null,
      createdAt: new Date(),
      clicks: 0,
      lastAccessed: null,
    });

    return NextResponse.json(
      {
        _id: newUrl._id,
        originalUrl: newUrl.originalUrl,
        alias: newUrl.alias,
        createdAt: newUrl.createdAt,
        clicks: newUrl.clicks,
        lastAccessed: newUrl.lastAccessed,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in /api/links/create:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}








