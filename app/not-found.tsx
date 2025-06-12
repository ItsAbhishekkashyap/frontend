"use client"
import Link from "next/link";

// app/not-found.tsx
export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-700 mb-6">
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <Link href="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
