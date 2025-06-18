"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiCompass, FiHome, FiFrown } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-indigo-100 rounded-full opacity-75 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full text-white">
              <FiFrown className="w-10 h-10" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Lost in the Digital Void
          </h1>
          <p className="text-gray-600 mb-6">
            The page you&#34;re looking for has vanished into the ether.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <FiHome className="w-5 h-5" />
              Return Home
            </Link>
            
            <Link
              href="/explore"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <FiCompass className="w-5 h-5" />
              Explore Instead
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-6 text-center">
          <p className="text-sm text-gray-500">
            Still lost? <Link href="/contact" className="text-indigo-600 hover:underline">Contact support</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}