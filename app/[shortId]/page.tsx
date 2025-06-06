import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: { shortId: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/links/${params.shortId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    // fallback redirect if slug not found
    redirect('/');
  }

  const data = await res.json();

  // ✅ finally redirect user
  redirect(data.originalUrl);
}





