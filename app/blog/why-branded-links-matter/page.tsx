"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiArrowRight, FiCheck, FiBarChart2, FiTrendingUp, FiShield } from "react-icons/fi";
import Link from "next/link";

const BrandedLinksMatterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-[length:60px_60px]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why <span className="text-indigo-200">Branded Links</span> Matter
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Discover how custom domains boost click-through rates, build trust, and transform your digital marketing success.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Trust Factor Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex flex-col gap-3">
                  <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <FiCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">The Trust Factor</h2>
                  <p className="text-gray-600">
                    Branded URLs signal legitimacy and professionalism, increasing click confidence.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="space-y-4 text-gray-700">
                <p>
                  When users see a link like <span className="font-mono bg-gray-100 px-3 py-1.5 rounded-lg text-indigo-600">brankly.app/SummerDeals</span>, it immediately appears more trustworthy than generic URLs. This psychological effect can boost click-through rates by up to <span className="font-semibold text-indigo-600">39%</span>.
                </p>
                <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800">
                    <span className="font-bold">Case Study:</span> A SaaS company saw a 42% increase in conversions after switching from generic to branded short links in their email campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Branding Consistency Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3 order-2 md:order-1">
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Branding Consistency</h2>
                <p>
                  Custom domains reinforce brand identity across every touchpoint. Whether shared on social media, in emails, or ads, branded URLs create memorable, professional impressions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {[
                    "ashrtl.app/ProductLaunch",
                    "ashrtl.app/Webinar2025",
                    "ashrtl.app/NewFeatures"
                  ].map((link, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -3 }}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="font-mono text-sm text-indigo-600 truncate">{link}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/3 order-1 md:order-2">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Brand Recall</h3>
                <p className="text-gray-600">
                  Repeated exposure to your branded domain increases recognition by up to 68%.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Performance Tracking Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiBarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Actionable Insights</h3>
                <p className="text-gray-600">
                  Track performance across campaigns with detailed analytics.
                </p>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Advanced Performance Tracking</h2>
                <p>
                  Branded links provide enhanced analytics to measure campaign effectiveness. With <span className="font-semibold text-indigo-600">Branqly</span>, you gain insights into:
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "High-performing channels and content",
                    "Optimal posting times",
                    "Audience geographic distribution",
                    "Device-specific engagement"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1"><FiCheck /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Click-Through Rates Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="md:w-1/2 bg-indigo-50 p-8 flex items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Impact on Click-Through Rates</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold text-indigo-600">34%</div>
                    <div className="text-gray-600">Higher CTR with branded links</div>
                  </div>
                  <p className="text-gray-700">
                    Generic shorteners like <span className="font-mono bg-gray-100 px-2 py-1 rounded">anything/xyz123</span> create hesitation, while branded links build instant recognition.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="h-full flex flex-col justify-center">
                  <div className="space-y-6 text-gray-600">
                    {[
                      { label: "Branded Links", value: 78, color: "bg-indigo-600" },
                      { label: "Generic Links", value: 44, color: "bg-gray-400" }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{item.label}</span>
                          <span className="font-bold">{item.value}% CTR</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${item.color}`} 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-sm text-gray-500">
                    *Based on aggregate data from 1,200+ marketing campaigns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 p-3 rounded-full">
                  <FiShield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Security & Privacy</h2>
              </div>
              <p className="text-blue-100 mb-6">
                Branqly provides enterprise-grade security features while maintaining full GDPR compliance:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "End-to-end encryption",
                  "Password protection",
                 
                  
                  "IP address anonymization",
                  
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-300 mr-2">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Elevate Your Links?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Start using branded links today and transform how your audience engages with your content.
            </p>
            <Link href="/pricing" className="bg-gradient-to-r w-[55%] sm:w-[30%] from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
              Get Started <FiArrowRight />
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default BrandedLinksMatterPage;
