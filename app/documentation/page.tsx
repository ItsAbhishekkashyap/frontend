import Link from "next/link";

export default function DocumentationPage() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Developer Documentation</h1>
      <p className="text-gray-700 mb-8 text-lg">
        Explore our comprehensive documentation to integrate, build, and scale with ShortLink. Whether you&#39;re shortening URLs or tracking analytics, we’ve got you covered.
      </p>

      <ul className="space-y-4 list-disc pl-6 text-gray-700">
        <li><strong>Authentication:</strong> Learn how to authenticate using API tokens securely.</li>
        <li><strong>Shorten URLs:</strong> Endpoints, request bodies, and responses.</li>
        <li><strong>Analytics:</strong> Access detailed stats for each short link.</li>
        <li><strong>Rate Limits:</strong> Understand request limits and throttling.</li>
        <li><strong>Error Codes:</strong> Common error formats and how to handle them.</li>
      </ul>

      <p className="mt-10 text-indigo-600 font-medium">
        Looking for live API examples? Visit the <Link href="/api" className="underline">API page</Link>.
      </p>
    </main>
  );
}
