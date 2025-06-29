"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheck, FiX, FiMail, FiCreditCard, FiClock, FiGlobe } from 'react-icons/fi';
import Meta from '@/components/Meta';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Meta 
        title="Refund Policy | Branqly"
        description="Read our refund policy to understand the terms and conditions for subscription cancellations."
      />
      <h1 style={{ display: 'none' }}>Branqly Refund Policy</h1>
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
                We want you to be satisfied, but here are our refund terms.
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
                    <span>Partial refund of <span className="font-semibold text-blue-600">50%</span> of subscription amount available if requested within <span className="font-semibold text-blue-600">7 days</span> of purchase.</span>
                  </li>
                  <li className="flex items-start">
                    <FiX className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span>No refunds will be provided for cancellations or refund requests made after the 7-day window.</span>
                  </li>
                  <li className="flex items-start">
                    <FiClock className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                    <span>Refunds are processed automatically to the original payment method within <span className="font-semibold">5-10 business days</span>.</span>
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
                      <span>Custom domain purchases (must be canceled before renewal).</span>
                    </li>
                    <li className="flex items-start">
                      <FiX className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                      <span>One-time feature unlocks or credits.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* New Section for International Payments */}
              <section className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <FiGlobe className="text-yellow-600 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">International Payments</h2>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <p className="text-gray-700">
                    For international customers making payments via PayPal or other cross-border methods, 
                    <span className="font-semibold text-red-600"> refunds are not available</span>. 
                    We encourage all international users to try our free tier or demo features before upgrading to a paid plan.
                  </p>
                </div>
              </section>

              {/* How to Request Refund */}
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
                      Go to your <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">Dashboard</Link>.
                    </li>
                    <li className="pl-2">Navigate to the &#39;Payment&#39; section.</li>
                    <li className="pl-2">Click &#39;Request Refund&#39; within 7 days of purchase.</li>
                    <li className="pl-2">
                      Or email us at <a href="mailto:support@branqly.xyz" className="text-blue-600 hover:underline font-medium">support@branqly.xyz</a> with your transaction ID.
                    </li>
                  </ol>
                </div>
              </section>

              {/* Cancellation Policy */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Cancellation Policy</h2>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <p className="text-gray-700">
                    You may cancel your subscription within <span className="font-semibold text-blue-600">7 days</span> after payment to receive a 50% refund.  
                    No refunds are available after this period.  
                    Cancellations take effect at the end of the current billing cycle.
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
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

