'use client';

import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await res.json();
        if (data.user) {
          setIsAuthenticated(true);
          const name = data.user.name;
          const email = data.user.email;
          if (name && name.trim() !== '') {
            setUserName(name);
          } else if (email) {
            setUserName(email.split('@')[0]);
          } else {
            setUserName('User');
          }
        } else {
          setIsAuthenticated(false);
        }
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="relative md:w-[150px] md:h-[50px] sm:w-[100px] sm:h-[40px] w-[100px] h-[30px] flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="AshrtL Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden ml-2 mr-2 md:flex space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-indigo-600 transition">Features</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition">Pricing</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition">Analytics</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition">Dashboard</Link>
            <Link href="/blog" className="text-gray-600 hover:text-indigo-600 transition">Blog</Link>
          </nav>

          {/* Desktop Auth Buttons + Welcome */}
          <div className="hidden md:flex space-x-4 items-center">
            {isAuthenticated && userName && (
              <span className="text-gray-600 text-sm mr-4 ml-2">Welcome, <span className="font-medium text-sm">{userName}</span></span>
            )}
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="w-full px-2 py-2 text-gray-600 cursor-pointer hover:text-indigo-600 transition text-left rounded hover:bg-indigo-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full px-2 py-2 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition"
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
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 w-full bg-white shadow rounded">
            <nav className="flex flex-col space-y-2 px-2">
              <Link href="/features" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link href="/blog" className="text-gray-600 hover:text-indigo-600 transition py-2 px-2 rounded hover:bg-indigo-50" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            </nav>

            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 px-2">
              {isAuthenticated && userName && (
                <span className="text-gray-600 px-2 text-sm">Welcome, <span className="font-medium">{userName}</span></span>
              )}
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="w-full px-4 py-2 text-gray-600 text-sm cursor-pointer hover:text-indigo-600 transition text-left rounded hover:bg-indigo-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full px-4 py-2 bg-indigo-600 text-sm cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition"
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
                  className="w-full px-4 py-2 bg-indigo-600 text-sm cursor-pointer text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
