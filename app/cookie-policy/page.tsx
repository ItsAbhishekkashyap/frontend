'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiShield, FiSettings, FiPieChart } from 'react-icons/fi';
import { MdCookie } from 'react-icons/md';

export default function CookiePolicyPage() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto py-16 px-6 sm:px-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4"
        >
          Our Cookie Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
        >
          Learn how we use cookies to improve your browsing experience while keeping your data private and secure.
        </motion.p>

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex items-center">
            <MdCookie className="text-white text-3xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-white">Branqly Cookie Policy</h2>
              <p className="text-indigo-100 mt-1">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="p-8 space-y-10">
            {/* About Cookies */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">About Cookies</h3>
              <p className="text-gray-600">
                Cookies are small data files stored on your device that help websites remember information about you. 
                This policy explains how Branqly uses cookies to enhance your experience.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">How We Use Cookies</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <FiShield className="w-6 h-6 text-indigo-600" />,
                    title: "Essential Cookies",
                    desc: "Used for authentication and secure sessions to keep your account safe.",
                    example: "Session tokens, CSRF protection."
                  },
                  {
                    icon: <FiSettings className="w-6 h-6 text-blue-600" />,
                    title: "Preference Cookies",
                    desc: "Remember your settings for a personalized browsing experience.",
                    example: "Language choice, theme selection."
                  },
                  {
                    icon: <FiPieChart className="w-6 h-6 text-purple-600" />,
                    title: "Analytics Cookies",
                    desc: "Collect anonymous data to improve site performance and usability.",
                    example: "Page view counts, feature usage."
                  },
                  {
                    icon: <MdCookie className="w-6 h-6 text-green-600" />,
                    title: "No Advertising Cookies",
                    desc: "We do NOT use third-party ads or social media trackers.",
                    example: "No tracking pixels, no cross-site ads."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 p-5 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start">
                      <div className="p-2 bg-white rounded-lg shadow-sm mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          <span className="font-medium">Example:</span> {item.example}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Managing Cookies */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Managing Cookies</h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p className="text-gray-700 mb-4">
                  You can control cookie usage via your browser:
                </p>
                <ul className="space-y-3 text-gray-700 list-disc list-inside">
                  {[
                    "Disable or delete cookies via browser settings.",
                    "Mobile devices may offer separate privacy controls.",
                    "Blocking essential cookies may affect site functionality.",
                    "Changes take effect after modifying settings."
                  ].map((tip, index) => (
                    <motion.li key={index} whileHover={{ x: 5 }}>
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Consent Notice */}
            <section className="pt-4 border-t border-gray-200">
              <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                <p className="text-gray-700 mb-4">
                  By using Branqly, you consent to our Cookie Policy.
                </p>
                <p className="text-gray-600 text-sm">
                  We may update this policy in the future. Significant changes will be communicated on this page or via email.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

