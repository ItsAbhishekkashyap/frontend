export default function GuidesPage() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Getting Started Guides</h1>
      <p className="text-gray-700 mb-8 text-lg">
        Step-by-step guides to help you use ShortLink effectively, whether you&#39;re a developer, marketer, or business user.
      </p>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-indigo-600">🔧 For Developers</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Integrating ShortLink API with Node.js</li>
            <li>Creating short links from a browser extension</li>
            <li>Automating link generation using Zapier</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-indigo-600">📈 For Businesses</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Tracking campaign clicks via UTM parameters</li>
            <li>Creating branded short links</li>
            <li>Generating QR codes for offline distribution</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
