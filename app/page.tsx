'use client';


import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiAlertCircle, FiClipboard, FiCopy, FiExternalLink, FiLink, FiLink2, FiLock, FiPieChart, FiShare2, FiSliders, FiZap } from 'react-icons/fi';
import { BsCheckLg } from 'react-icons/bs';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Script from 'next/script';
import FeatureCard from './components/FeatureCard';

import {
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPrinter,
  FiArrowRight
} from 'react-icons/fi';
import StepCard from './components/StepCard';
import Link from 'next/link';
import Image from 'next/image';


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

      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with Gradient Background */}
        <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 py-10 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex items-center justify-center bg-white rounded-2xl shadow-lg mb-6"
              >
                {/* <FiLink className="text-indigo-600 text-4xl" /> */}
                <Link href="/">
            <div className="relative w-[80px] h-[80px] flex items-center justify-center "> {/* Debug border */}
              <Image
                src="/favicon.svg"
                alt="AshrtL Logo"
                width={80}
                height={80}
                className="object-contain"
                
              />
            </div>
          </Link>

              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Shorten, Share & <span className="text-indigo-600">Track</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                Transform long links into powerful, trackable URLs with our premium shortening service
              </p>
            </motion.div>

            {/* URL Shortener Card with Floating Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                        Paste your long URL
                      </label>
                      <span className="text-xs text-indigo-600">No registration required</span>
                    </div>
                    <div className="relative">
                      <input
                        type="url"
                        id="url"
                        required
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/url..."
                        className="w-full px-5 py-4 border-2 text-gray-400 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-lg"
                      />
                      <FiLink className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all ${isLoading ? 'bg-indigo-400' : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-md'}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Shortening...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FiZap className="mr-2" />
                        Shorten URL
                      </span>
                    )}
                  </motion.button>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100"
                    >
                      <div className="flex items-start">
                        <FiAlertCircle className="flex-shrink-0 mr-2 text-lg" />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}
                </form>

                {shortUrl && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 p-5 bg-indigo-50 rounded-xl border border-indigo-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-700">Your shortened URL:</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-indigo-600 font-medium truncate hover:underline text-lg"
                      >
                        {shortUrl}
                      </a>
                      <div className="flex space-x-2 ml-3">
                        <button
                          onClick={copyToClipboard}
                          className="p-2 rounded-lg hover:bg-indigo-100 transition flex items-center justify-center"
                          title="Copy to clipboard"
                        >
                          {copied ? (
                            <BsCheckLg className="text-green-500 text-xl" />
                          ) : (
                            <FiCopy className="text-indigo-600 text-xl" />
                          )}
                        </button>
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-indigo-100 transition flex items-center justify-center"
                          title="Open in new tab"
                        >
                          <FiExternalLink className="text-indigo-600 text-xl" />
                        </a>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <BsCheckLg className="mr-1.5 text-green-500" />
                      <span>Link is ready to use • </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>



        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
                Powerful Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                More Than Just Link Shortening
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Advanced tools to help you understand and optimize your links
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <FeatureCard
                icon={<FiLock className="text-indigo-600 text-3xl" />}
                title="Secure Links"
                description="Password protection and encrypted links for sensitive content"
                badge="Security"
              />
              <FeatureCard
                icon={<FiPieChart className="text-indigo-600 text-3xl" />}
                title="Advanced Analytics"
                description="Real-time tracking of clicks, and time"
                badge="Insights"
              />
              
              <FeatureCard
                icon={<FiLink2 className="text-indigo-600 text-3xl" />}
                title="Custom Alias"
                description="Use your own alias for branded short links"
                badge="Branding"
              />
              
            </div>
          </div>
        </section>

        {/* How It Works - Animated Steps */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
          <div className="container mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4 shadow-sm">
                ✨ Simple Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text  bg-gradient-to-r from-indigo-600 to-indigo-400">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transform your links in just a few clicks with our intuitive platform
              </p>
            </motion.div>

            {/* Steps */}
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-4 md:-left-8 top-10 h-full w-0.5 bg-indigo-100 md:block hidden"></div>
                  <StepCard
                    number={1}
                    title="Paste URL"
                    description="Enter any long web address"
                    icon={<FiClipboard className="text-indigo-600" />}
                    accentColor="bg-indigo-100"
                  />
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <StepCard
                    number={2}
                    title="Customize"
                    description="Add aliases or set expiration"
                    icon={<FiSliders className="text-indigo-600" />}
                    accentColor="bg-blue-100"
                  />
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative"
                >
                  <StepCard
                    number={3}
                    title="Share"
                    description="Use your compact link anywhere"
                    icon={<FiShare2 className="text-indigo-600" />}
                    accentColor="bg-purple-100"
                  />
                </motion.div>

                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <StepCard
                    number={4}
                    title="Track"
                    description="Monitor clicks and engagement"
                    icon={<FiActivity className="text-indigo-600" />}
                    accentColor="bg-pink-100"
                  />
                </motion.div>
              </div>
            </div>

            {/* Animated Arrow Connectors (Desktop Only) */}
            <div className="hidden md:flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + item * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-16 h-1 bg-indigo-200 rounded-full"></div>
                    <FiArrowRight className="text-indigo-400 mx-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full mb-4">
                Perfect For
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Where You&#39;ll Use It
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Optimize your links for every platform and purpose
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Social Media Card */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="bg-pink-100 w-22 h-16 rounded-lg flex items-center justify-center mb-6">
                  <div className="flex space-x-1">
                    <FiTwitter className="text-pink-600 text-2xl" />
                    <FiInstagram className="text-pink-600 text-2xl" />
                    <FiFacebook className="text-pink-600 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media</h3>
                <p className="text-gray-600 mb-4">Overcome character limits and track engagement across platforms</p>
                <Link href="/use-cases/social-media"  className="flex items-center text-sm text-pink-600 font-medium">
                  <FiArrowRight className="mr-2" />
                  Learn more
                </Link >
              </div>

              {/* Email Marketing Card */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <FiMail className="text-blue-600 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email Marketing</h3>
                <p className="text-gray-600 mb-4">Clean, trackable links for newsletters and campaigns</p>
                <Link href="/use-cases/email-marketing" className="flex items-center text-sm text-blue-600 font-medium">
                  <FiArrowRight className="mr-2" />
                  Learn more
                </Link >
              </div>

              {/* Print Materials Card */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <FiPrinter className="text-purple-600 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Print Materials</h3>
                <p className="text-gray-600 mb-4">Convert long URLs to scannable QR codes for offline use</p>
                <Link href="/use-cases/print-materials" className="flex items-center text-sm text-purple-600 font-medium">
                  <FiArrowRight className="mr-2" />
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Professional & Brilliant Footer */}
      <Footer />
    </div>
  );
}
