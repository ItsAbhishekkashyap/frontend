'use client';

import { useState, useEffect } from 'react';
import Meta from '@/components/Meta';
// import { useRouter } from 'next/navigation';

export default function ShortenPage() {
//   const router = useRouter();
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [isPremium, setIsPremium] = useState(false);  // fetch from user session
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user session info on mount (example, implement your session fetching)
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        setIsPremium(data.user?.isPremium ?? false);
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!originalUrl) {
      setError('Please enter the URL');
      return;
    }

    if (customAlias && !isPremium) {
      setError('Custom alias is available only for premium users.');
      return;
    }

    try {
      const res = await fetch('/api/link/create', {
        method: 'POST',
        body: JSON.stringify({ originalUrl, customAlias: isPremium ? customAlias : undefined }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create short link');
      } else {
        setSuccess(`Short URL created: ${window.location.origin}/r/${data.alias}`);
        setOriginalUrl('');
        setCustomAlias('');
      }
    } catch (err) {
        console.error(err);
      setError('Unexpected error occurred');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <Meta 
        title="Shorten Links with Premium Features | Branqly"
        description="Use Branqly’s premium link shortener for better customization, analytics, and branded URLs."
      />
      <h1 style={{ display: 'none' }}>Branqly Premium URL Shortener</h1>
      <h1 className="text-3xl font-bold mb-6">Shorten Your URL</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter URL"
          required
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {isPremium && (
          <input
            type="text"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="w-full p-2 border rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Shorten
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && <p className="mt-4 text-green-600 break-words">{success}</p>}
    </main>
  );
}
