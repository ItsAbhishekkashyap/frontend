'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiTruck, FiClock, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import Meta from '@/components/Meta';

export default function ShippingDeliveryPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">

<Meta 
        title="Shipping & Delivery Policy | Branqly Services"
        description="Understand Branqly's shipping and delivery policies for digital products and services. We ensure timely and secure service delivery."
      />
      <h1 style={{ display: 'none' }}>Branqly Shipping and Delivery Information</h1>


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
            Shipping and Delivery Policy
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This Shipping and Delivery Policy outlines how Branqly handles the delivery of digital services and ensures timely access to our products.
          </p>
        </div>

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6">
            <h2 className="text-2xl font-bold text-white">Branqly Shipping & Delivery Policy</h2>
            <p className="text-green-100 mt-1">
              Our goal is to provide seamless and reliable digital delivery of all services and products.
            </p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            {/* Delivery Coverage */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiTruck className="w-4 h-4 text-green-600" />
                </div>
                Delivery Coverage
              </h3>
              <p className="text-gray-600">
                Branqly provides digital services and software products accessible globally. No physical shipping is involved as our services are delivered entirely online.
                Customers can access their purchased products through secure account login from anywhere with internet connectivity.
              </p>
            </section>

            {/* Delivery Timelines */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiClock className="w-4 h-4 text-green-600" />
                </div>
                Delivery Timelines
              </h3>
              <p className="text-gray-600">
                Upon successful payment confirmation, customers receive immediate access to their digital products. Login credentials or license keys are sent to the registered email address instantly.
                We ensure prompt delivery to provide a smooth customer experience.
              </p>
            </section>

            {/* Service Locations */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiMapPin className="w-4 h-4 text-green-600" />
                </div>
                Service Locations
              </h3>
              <p className="text-gray-600">
                Our digital services are accessible worldwide, subject to internet availability and compliance with local laws and regulations. Customers are responsible for ensuring they have the necessary internet access to use our services.
              </p>
            </section>

            {/* Delivery Issues */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FiAlertCircle className="w-4 h-4 text-green-600" />
                </div>
                Delivery Issues and Support
              </h3>
              <p className="text-gray-600">
                In the unlikely event of delivery or access issues, please contact our customer support team immediately at 
                <a href="mailto:abhi47025@gmail.com" className="text-blue-600 underline ml-1">
                  abhi47025@gmail.com
                </a>. 
                We are committed to resolving all issues promptly and ensuring continuous access to our services.
              </p>
            </section>

            {/* Additional Information */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Additional Information</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All deliveries are digital; no physical shipment will occur.</li>
                <li>Customers must provide accurate email and contact information for timely delivery.</li>
                <li>Branqly is not responsible for delays caused by third-party email providers or internet outages.</li>
                <li>This policy may be updated periodically, and customers will be notified of major changes.</li>
              </ul>
            </section>

            {/* Contact Support */}
            <section className="pt-4">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions or concerns about our Shipping and Delivery Policy, please feel free to contact us anytime.
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
