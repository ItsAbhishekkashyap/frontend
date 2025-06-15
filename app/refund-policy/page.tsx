"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheck, FiX, FiMail, FiCreditCard, FiClock } from 'react-icons/fi';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Policy Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 md:p-8 text-white">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Refund Policy</h1>
              <p className="text-blue-100 text-lg">
                We want you to be completely satisfied with your Branqly experience.
              </p>
            </div>
          </div>

          {/* Policy Content */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="max-w-3xl mx-auto space-y-10">
              {/* Refund Section */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FiCreditCard className="text-blue-600 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Subscription Refunds</h2>
                </div>
                <ul className="space-y-3 pl-2 text-gray-600">
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Full refunds available within <span className="font-semibold text-blue-600">7 days</span> of purchase if no premium links have been created</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Partial refunds for unused portions of monthly subscriptions after the 7-day period</span>
                  </li>
                  <li className="flex items-start">
                    <FiClock className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                    <span>Refunds processed to original payment within <span className="font-semibold">5-10 business days</span></span>
                  </li>
                </ul>
              </section>

              {/* Non-Refundable Section */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <FiX className="text-red-600 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Non-Refundable Items</h2>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <FiX className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                      <span>Custom domain purchases (must be canceled before renewal)</span>
                    </li>
                    <li className="flex items-start">
                      <FiX className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                      <span>One-time feature unlocks or credits</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Request Refund Section */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FiMail className="text-green-600 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">How to Request a Refund</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <ol className="space-y-4 pl-1 list-decimal text-gray-600 list-inside">
                    <li className="pl-2">
                      Go to your <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">Dashboard</Link>
                    </li>
                    <li className="pl-2">Navigate to &#39;Payment&#39; section</li>
                    <li className="pl-2">Click &#39;Request Refund&#39;</li>
                    <li className="pl-2">
                      Or email us at <a href="mailto:support@branqly.xyz" className="text-blue-600 hover:underline font-medium">support@branqly.xyz</a> with your transaction ID
                    </li>
                  </ol>
                </div>
              </section>

              {/* Cancellation Section */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Cancellation Policy</h2>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <p className="text-gray-700">
                    You may cancel your subscription within a first week after payment. Cancellations take effect at the end of your current billing cycle. 
                    No prorated refunds for partial months unless requested within the 7-day window.
                  </p>
                </div>
              </section>

              {/* Disputes Section */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Disputes</h2>
                <p className="text-gray-700">
                  For any payment disputes, please contact us first at <span className="font-semibold text-blue-600">support@branqly.xyz</span> before initiating a chargeback. 
                  Chargebacks may result in automatic account suspension.
                </p>
              </section>

              {/* Last Updated */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}