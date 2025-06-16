'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiTruck, FiClock, FiMapPin, FiAlertCircle } from 'react-icons/fi';

export default function ShippingDeliveryPage() {
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
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 mb-4"
          >
            Shipping & Delivery Policy
          </motion.h1>
        </div>

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white">Branqly Shipping & Delivery</h2>
            <p className="text-green-100 mt-1">Transparent, timely, and reliable service.</p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiTruck className="w-4 h-4 text-green-600" />
                </div>
                Delivery Coverage
              </h3>
              <p className="text-gray-600">
                We offer digital services globally. As Branqly provides SaaS products, no physical shipping is required. All product access is provided digitally via secure account login.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiClock className="w-4 h-4 text-green-600" />
                </div>
                Delivery Timelines
              </h3>
              <p className="text-gray-600">
                Instant access is granted upon successful purchase or subscription. Users will receive login credentials or access instructions immediately via their registered email.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiMapPin className="w-4 h-4 text-green-600" />
                </div>
                Service Locations
              </h3>
              <p className="text-gray-600">
                Our digital services are accessible from any location worldwide, subject to internet availability and compliance with applicable local laws.
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiAlertCircle className="w-4 h-4 text-green-600" />
                </div>
                Delivery Issues
              </h3>
              <p className="text-gray-600">
                In rare cases of technical delays, please contact our support team at 
                <a href="mailto:abhi47025@gmail.com" className="text-blue-600 underline ml-1">abhi47025@gmail.com</a>.
                We are committed to resolving all access issues promptly.
              </p>
            </section>

            <section className="pt-4">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions regarding our Shipping & Delivery Policy, feel free to reach out to us.
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
