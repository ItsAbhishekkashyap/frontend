'use client';

import { useState } from 'react';
import {  FiHome, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="relative w-[200px] h-[50px] flex items-center justify-center border border-dashed"> {/* Debug border */}
              <Image
                src="/logo.svg"
                alt="AshrtL Logo"
                width={200}
                height={50}
                className="object-contain"
                
              />
            </div>
          </Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition"
            >
              <FiHome className="text-lg" />
              Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-indigo-600 transition"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-2"
            >
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-gray-700 px-3 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiHome />
                  Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
