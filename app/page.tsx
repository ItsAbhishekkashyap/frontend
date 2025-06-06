'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl('');

    const res = await fetch('/api/links/create', {
      method: 'POST',
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(`${window.location.origin}/${data.slug}`);
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 cursor-pointer text-white p-2 rounded">
          Shorten
        </button>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p>Short URL:</p>
            <a href={shortUrl} target="_blank" className="text-blue-600 underline">
              {shortUrl}
            </a>
          </div>
        )}
      </form>
    </main>
  );
}
