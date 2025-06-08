'use client';


import {  useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiExternalLink, FiLink } from 'react-icons/fi';
import { BsCheckLg } from 'react-icons/bs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Script from 'next/script';

// export const metadata = {
//   title: "AshrtL – The Smarter URL Shortener",
//   description: "Create short links, monitor clicks, and manage your URLs with ease. AshrtL makes link shortening smarter.",
//   keywords: ["URL shortener", "AshrtL", "smart links", "link analytics", "free short link"],
//   openGraph: {
//     title: "AshrtL",
//     description: "Smart, fast and reliable URL shortening for modern web.",
//     url: "https://ashrtl.xyz",
//     type: "website",
//     images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AshrtL OG" }],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@AshrtL",
//     title: "AshrtL",
//     description: "Smarter URL Shortener",
//     images: ["/og-image.png"],
//   },
// };



export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShortUrl('');
    setError('');

    try {
      const res = await fetch('/api/links/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(`${window.location.origin}/${data.slug}`);
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

<Script id="ld-json" type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AshrtL",
    "url": "https://ashrtl.xyz",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ashrtl.xyz/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  })}
</Script>
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header section */}

    <Navbar/>

      {/* Main Content */}
      <main className="flex-grow flex items-center  justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center bg-indigo-100 p-4 rounded-full mb-4"
              >
                <FiLink className="text-indigo-600 text-3xl" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Shorten Your Links</h1>
              <p className="text-gray-600">Create short, memorable URLs in seconds</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your long URL
                </label>
                <input
                  type="url"
                  id="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url..."
                  className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Shortening...
                  </span>
                ) : 'Shorten URL'}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 text-red-600 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
            </form>

            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-8 p-4 bg-indigo-50 rounded-lg"
              >
                <p className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</p>
                <div className="flex items-center">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-indigo-600 font-medium truncate hover:underline"
                  >
                    {shortUrl}
                  </a>
                  <div className="flex space-x-2 ml-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 rounded-full hover:bg-indigo-100 transition"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <BsCheckLg className="text-green-500" />
                      ) : (
                        <FiCopy className="text-indigo-600" />
                      )}
                    </button>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-indigo-100 transition"
                      title="Open in new tab"
                    >
                      <FiExternalLink className="text-indigo-600" />
                    </a>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-1"></span>
                  <span>Link is active and ready to use</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Professional & Brilliant Footer */}
      <Footer/>
    </div>
  );
}
