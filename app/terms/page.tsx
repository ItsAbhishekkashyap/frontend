'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiShield, FiTerminal, FiZap, FiMail, FiGlobe } from 'react-icons/fi';
import Meta from '@/components/Meta';


export default function TermsPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

 <Meta 
        title="Branqly Terms and Conditions"
        description="Read Branqly's terms and conditions carefully before using our link shortening services."
      />
      <h1 style={{ display: 'none' }}>Branqly Terms and Conditions</h1>

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
            Terms of Service
          </motion.h1>
        </div>

        {/* Terms Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">Branqly Terms of Service</h2>
            <p className="text-indigo-100 mt-1">Please read these terms carefully</p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FiZap className="w-4 h-4 text-indigo-600" />
                </div>
                Service Overview
              </h3>
              <p className="text-gray-600">
                Branqly provides URL shortening services (&#34;as-is&#34;) with no guarantees of uptime or availability. By using our services, you agree to abide by these terms.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FiShield className="w-4 h-4 text-indigo-600" />
                </div>
                User Responsibilities
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <FiAlertTriangle className="w-5 h-5 text-red-500" />,
                    title: "Prohibited Content",
                    content: "Spamming, phishing, or illegal use of short links is strictly prohibited."
                  },
                  {
                    icon: <FiTerminal className="w-5 h-5 text-indigo-500" />,
                    title: "Content Moderation",
                    content: "We reserve the right to remove any links that violate our policies."
                  },
                  {
                    icon: <FiShield className="w-5 h-5 text-yellow-500" />,
                    title: "Account Suspension",
                    content: "Accounts may be suspended for violations without prior notice."
                  },
                  {
                    icon: <FiMail className="w-5 h-5 text-green-500" />,
                    title: "Communication",
                    content: "We may contact you regarding service changes or policy updates."
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
                Additional Terms
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <ul className="space-y-4">
                  {[
                    "We may modify these terms at any time with notice",
                    "You are responsible for all activity under your account",
                    "Service may be temporarily unavailable for maintenance",
                    "We are not liable for indirect or consequential damages",
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

            {/* NEW International Payments Section */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FiGlobe className="w-4 h-4 text-indigo-600" />
                </div>
                International Payments
              </h3>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                <p className="text-gray-700">
                  For customers making international payments via PayPal or other foreign gateways, please note that <span className="font-semibold text-red-600">refunds are not available</span>. We recommend trying our free features before upgrading to a paid plan to ensure our service fits your needs.
                </p>
              </div>
            </section>

            <section className="pt-4">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Questions about our terms?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us.
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

