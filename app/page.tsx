'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiExternalLink, FiLink, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { BsCheckLg, BsTwitter, BsGithub, BsLinkedin, BsInstagram, BsDribbble } from 'react-icons/bs';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';



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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await res.json();
        setIsAuthenticated(!!data.user);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
    window.location.href = '/'; // Redirect to homepage after logout
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
       <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FiLink className="text-indigo-600 text-2xl" />
            <h1 className="text-xl font-bold text-gray-800">ShortLink</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">Analytics</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">API</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="w-full px-4 py-2 text-gray-600 cursor-pointer hover:text-indigo-600 transition text-left rounded hover:bg-indigo-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Analytics</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>API</a>
            </nav>

            <div className="flex flex-col space-y-3 pt-2 border-t border-gray-100">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="w-full px-4 py-2 text-gray-600 cursor-pointer hover:text-indigo-600 transition text-left rounded hover:bg-indigo-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>

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
      <footer className="bg-indigo-900  text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FiLink className="text-indigo-300 text-2xl" />
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                  ShortLink
                </h2>
              </div>
              <p className="text-indigo-200 max-w-xs">
                Transform long URLs into short, powerful links that drive engagement and track performance.
              </p>
              <div className="flex space-x-4 pt-2">
                {[
                  { icon: <BsTwitter className="text-xl" />, label: "Twitter" },
                  { icon: <BsGithub className="text-xl" />, label: "GitHub" },
                  { icon: <BsLinkedin className="text-xl" />, label: "LinkedIn" },
                  { icon: <BsInstagram className="text-xl" />, label: "Instagram" },
                  { icon: <BsDribbble className="text-xl" />, label: "Dribbble" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-indigo-200 hover:text-white transition-colors duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Product</h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Analytics', 'API', 'Integrations'].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-indigo-200 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Resources</h3>
              <ul className="space-y-3">
                {['Documentation', 'Guides', 'Blog', 'Support', 'Status'].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-indigo-200 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiMapPin className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-indigo-200">123 Link Street, San Francisco, CA 94107</span>
                </li>
                <li className="flex items-start">
                  <FiMail className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                  <a href="mailto:hello@shortlink.com" className="text-indigo-200 hover:text-white transition-colors">
                    hello@shortlink.com
                  </a>
                </li>
                <li className="flex items-start">
                  <FiPhone className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                  <a href="tel:+11234567890" className="text-indigo-200 hover:text-white transition-colors">
                    +1 (123) 456-7890
                  </a>
                </li>
              </ul>


            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-indigo-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-indigo-300 text-sm">
              © {new Date().getFullYear()} ShortLink. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
