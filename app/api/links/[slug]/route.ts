import { connectToDB } from '@/lib/mongodb';
import { Url } from '@/models/Url';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    await connectToDB();
    const { slug } = params;

    const urlDoc = await Url.findOne({ slug });

    if (!urlDoc) {
      return new Response(JSON.stringify({ error: 'URL not found' }), { status: 404 });
    }

    return Response.redirect(urlDoc.originalUrl, 302);
  } catch (error) {
    console.error('[ERROR_REDIRECT_LINK]', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
