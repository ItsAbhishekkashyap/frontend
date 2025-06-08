'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import {  FiShield, FiSettings, FiPieChart } from 'react-icons/fi';
import { MdCookie } from 'react-icons/md';

export default function CookiePolicyPage() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
        <Navbar/>
      <main className="max-w-4xl mx-auto py-16 px-6 sm:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4"
          >
            Our Cookie Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            How we use cookies to enhance your experience while respecting your privacy
          </motion.p>
        </div>

        {/* Policy Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex items-center">
            <MdCookie className="text-white text-2xl mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-white">ShortLink Cookie Policy</h2>
              <p className="text-indigo-100 mt-1">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                About Cookies
              </h3>
              <p className="text-gray-600">
                Cookies are small text files stored on your device when you visit websites. 
                This policy explains how ShortLink uses cookies and similar technologies.
              </p>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">
                How We Use Cookies
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <FiShield className="w-5 h-5 text-indigo-600" />,
                    title: "Essential Cookies",
                    description: "For authentication and security to keep you logged in and protect your account",
                    examples: "Session cookies, CSRF tokens"
                  },
                  {
                    icon: <FiSettings className="w-5 h-5 text-blue-600" />,
                    title: "Preference Cookies",
                    description: "Remember your settings and preferences for a better experience",
                    examples: "Language selection, theme preference"
                  },
                  {
                    icon: <FiPieChart className="w-5 h-5 text-purple-600" />,
                    title: "Analytics Cookies",
                    description: "Help us understand how visitors use our platform to improve it",
                    examples: "Page visits, feature usage"
                  },
                  {
                    icon: <MdCookie className="w-5 h-5 text-green-600" />,
                    title: "What We Don't Use",
                    description: "We never use third-party advertising or tracking cookies",
                    examples: "No social media trackers, no ad networks"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -3 }}
                    className="bg-gray-50 p-5 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          <span className="font-medium">Examples:</span> {item.examples}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Managing Cookies
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p className="text-gray-700 mb-4">
                  You have control over cookies through your browser settings:
                </p>
                <ul className="space-y-3">
                  {[
                    "Most browsers allow you to refuse or delete cookies",
                    "Mobile devices may have additional privacy controls",
                    "Blocking essential cookies may affect site functionality",
                    "Changes apply from when you adjust your settings"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="pt-4">
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                  <p className="text-gray-700 mb-4">
                    By continuing to use our site, you consent to our use of cookies as described in this policy.
                  </p>
                  <p className="text-gray-600 text-sm">
                    We may update this policy occasionally. Significant changes will be communicated through our platform or via email.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer/>
    </div>
  );
}
