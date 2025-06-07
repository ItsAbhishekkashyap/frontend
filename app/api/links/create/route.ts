import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { User } from '@/models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

function generateSlug(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    // Parse JSON body
    const { originalUrl, customAlias } = await request.json();

    if (!originalUrl || typeof originalUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    // Get token from cookies or authorization header
    const token = request.cookies.get('token')?.value || 
      request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify JWT token
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch user from DB
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // If customAlias is provided, check premium
    let slug = '';
    if (customAlias) {
      if (!user.premium) {
        return NextResponse.json({ error: 'Only premium users can create custom aliases' }, { status: 403 });
      }
      // Validate customAlias format (optional but recommended)
      const aliasRegex = /^[a-zA-Z0-9_-]{3,30}$/;
      if (!aliasRegex.test(customAlias)) {
        return NextResponse.json({ error: 'Custom alias invalid format' }, { status: 400 });
      }

      // Check uniqueness
      const exists = await Url.findOne({ slug: customAlias });
      if (exists) {
        return NextResponse.json({ error: 'Custom alias already taken' }, { status: 409 });
      }
      slug = customAlias;
    } else {
      // No custom alias, generate random slug
      slug = generateSlug();
      while (await Url.findOne({ slug })) {
        slug = generateSlug();
      }
    }

    // Save new shortened URL with user ID attached
    const newUrl = new Url({
      originalUrl,
      slug,
      user: user._id, // track owner of link
    });
    await newUrl.save();

    return NextResponse.json({ slug }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


