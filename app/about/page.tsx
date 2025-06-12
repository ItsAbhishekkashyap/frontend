"use client";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiLock, FiPieChart, FiLink2, FiClipboard, FiSliders, FiShare2, FiActivity, FiPrinter, FiMail } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-full shadow-lg">
              <div className="relative w-[80px] h-[80px] flex items-center justify-center border border-dashed"> {/* Debug border */}
                            <Image
                              src="/favicon.svg"
                              alt="Branqly Logo"
                              width={80}
                              height={80}
                              className="object-contain"
                              
                            />
                          </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6"
          >
            About Branqly
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Branqly is a modern URL shortening platform designed to provide secure, customizable, and insightful link management solutions for individuals, marketers, and businesses.
          </motion.p>
        </motion.section>

        {/* Features Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FiLock className="text-indigo-600 text-4xl" />,
                  title: "Secure Links",
                  desc: "Password-protect and encrypt your links for maximum security.",
                },
                {
                  icon: <FiPieChart className="text-indigo-600 text-4xl" />,
                  title: "Advanced Analytics",
                  desc: "Real-time tracking of link clicks and engagement time.",
                },
                {
                  icon: <FiLink2 className="text-indigo-600 text-4xl" />,
                  title: "Custom Alias",
                  desc: "Use branded or personalized aliases to make your links stand out.",
                },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:border-indigo-100 transition-all"
                >
                  <div className="bg-indigo-50 p-4 rounded-full w-max mx-auto mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">How It Works</h2>
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 transform -translate-y-1/2"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {[
                  { icon: <FiClipboard className="text-indigo-600 text-3xl" />, title: "Paste URL", desc: "Enter any long web address." },
                  { icon: <FiSliders className="text-indigo-600 text-3xl" />, title: "Customize", desc: "Set aliases." },
                  { icon: <FiShare2 className="text-indigo-600 text-3xl" />, title: "Share", desc: "Distribute your short link anywhere." },
                  { icon: <FiActivity className="text-indigo-600 text-3xl" />, title: "Track", desc: "Monitor clicks and performance." },
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center relative z-10"
                  >
                    <div className="bg-indigo-50 p-3 rounded-full w-max mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Use Cases Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Use Cases</h2>
          <p className="text-gray-600 text-center text-lg mb-8 leading-relaxed">
            Branqly is perfect for Social Media Influencers, Email Marketers, and Print Campaign Managers who need compact, trackable, and secure URLs.
          </p>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-inner">
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                  <FiShare2 className="text-indigo-600" />
                </div>
                <span className="text-gray-700">Social Media: Overcome character limits and track engagement.</span>
              </motion.li>
              
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                  <FiMail className="text-indigo-600" />
                </div>
                <span className="text-gray-700">Email Marketing: Include clean and monitorable links in newsletters.</span>
              </motion.li>
              
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                  <FiPrinter className="text-indigo-600" />
                </div>
                <span className="text-gray-700">Print Materials: Convert long URLs into scannable QR codes for offline use.</span>
              </motion.li>
            </ul>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
