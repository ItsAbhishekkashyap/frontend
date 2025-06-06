import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';
import { generateSlug } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { originalUrl } = await req.json();

    if (!originalUrl || !originalUrl.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Invalid URL' }), { status: 400 });
    }
    console.log('SERVER_ENV_MONGO:', process.env.MONGODB_URI);


    // Check if already exists
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      return new Response(JSON.stringify({ slug: existing.slug }), { status: 200 });
    }

    // Generate a unique slug
    let slug = '';
    let isUnique = false;
    while (!isUnique) {
      slug = generateSlug();
      const existingSlug = await Url.findOne({ slug });
      if (!existingSlug) isUnique = true;
    }

    const newUrl = await Url.create({ originalUrl, slug });

    return new Response(JSON.stringify({ slug: newUrl.slug }), { status: 201 });
  } catch (error) {
    console.error('[ERROR_CREATE_LINK]', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
