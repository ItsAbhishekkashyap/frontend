'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiLock, FiShield, FiUser, FiAlertTriangle, FiMail } from 'react-icons/fi';

export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto py-16 px-6 sm:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4"
          >
            Privacy Policy
          </motion.h1>
        </div>

        {/* Privacy Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">Branqly Privacy Policy</h2>
            <p className="text-indigo-100 mt-1">Your privacy is important to us</p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FiLock className="w-4 h-4 text-indigo-600" />
                </div>
                Data Collection
              </h3>
              <p className="text-gray-600">
                We collect limited data to provide our services, including email addresses for account management and usage data for analytics. We do not sell or share your personal information.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FiShield className="w-4 h-4 text-indigo-600" />
                </div>
                Data Security
              </h3>
              <p className="text-gray-600">
                We implement industry-standard security measures to protect your data. However, no online service is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FiUser className="w-4 h-4 text-indigo-600" />
                </div>
                User Rights
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <FiAlertTriangle className="w-5 h-5 text-red-500" />,
                    title: "Access & Correction",
                    content: "You can access and update your personal information anytime."
                  },
                  {
                    icon: <FiShield className="w-5 h-5 text-yellow-500" />,
                    title: "Data Deletion",
                    content: "Request deletion of your account and associated data by contacting support."
                  },
                  {
                    icon: <FiMail className="w-5 h-5 text-green-500" />,
                    title: "Communication Preferences",
                    content: "Manage how we communicate with you via account settings."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center mb-2">
                      {item.icon}
                      <h4 className="font-medium text-gray-800 ml-2">{item.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                Additional Information
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <ul className="space-y-4">
                  {[
                    "We may update this Privacy Policy from time to time.",
                    "Users will be notified of significant changes via email.",
                    "Data processing is limited to service improvement and analytics.",
                    "We comply with applicable data protection laws and regulations."
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-1 mr-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="pt-4">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Questions about our privacy practices?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us.
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

