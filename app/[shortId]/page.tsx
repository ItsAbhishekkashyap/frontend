import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: { shortId: string } }) {
  const { shortId } = params;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  const res = await fetch(`${backendUrl}/api/links/${shortId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    redirect('/');
  }

  const data = await res.json();
  redirect(data.originalUrl);
}



