'use client';

import { useEffect, useState } from 'react';

import { FiLink } from 'react-icons/fi';

import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';




export default function Navbar() {
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

  return(
<header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
          <div  className="flex items-center space-x-2">
            
            <FiLink className="text-indigo-600 text-2xl" />
            <h1 className="text-xl font-bold text-gray-800">ShortLink</h1>
            
          </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-indigo-600 transition">Features</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition">Analytics</Link>
            <Link href="/blog" className="text-gray-600 hover:text-indigo-600 transition">Blog</Link>
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
  )

}
