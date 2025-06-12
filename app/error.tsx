// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-700 mb-6">Please try again later or go back to the homepage.</p>
        <button
          onClick={reset}
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
