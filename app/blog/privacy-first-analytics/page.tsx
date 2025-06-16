"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  FiShield, FiLock, FiEyeOff, FiServer, 
  FiCheckCircle, FiBarChart2, FiSmartphone 
} from "react-icons/fi";
import Link from "next/link";

export default function PrivacyFirstAnalytics() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-indigo-900 py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern-lock.svg')] bg-[length:80px_80px] md:bg-[length:120px_120px]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-3 md:mb-6">
              <FiShield className="text-white" />
              <span className="text-white text-xs sm:text-sm font-medium">Privacy by Design</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
              Privacy-First Analytics
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-3xl mx-auto">
              Powerful insights without compromising user privacy — the ethical way to track engagement.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">

        {/* Introduction Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="md:w-1/3 w-full">
              <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="bg-blue-100 text-blue-600 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <FiLock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Why Privacy Matters</h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  In an era of data breaches, respecting user privacy is both ethical and essential for compliance.
                </p>
              </div>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="space-y-3 md:space-y-4 text-gray-700 text-xs sm:text-sm md:text-base">
                <p>
                  At Branqly, we&#39;ve reimagined analytics to provide valuable insights while upholding the highest privacy standards. Our approach aligns with global regulations like GDPR and CCPA, ensuring you never have to choose between data and ethics.
                </p>
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800 text-xs sm:text-sm md:text-base">
                    Unlike traditional analytics that track individuals, we focus on aggregate patterns that respect anonymity while still delivering actionable insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Techniques Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Our Privacy-Preserving Techniques
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: <FiBarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
                title: "Aggregated Data Only",
                description: "We analyze trends from non-identifiable group data rather than individual behavior"
              },
              {
                icon: <FiSmartphone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
                title: "On-Device Processing",
                description: "Analytics computations occur locally when possible to minimize data transmission"
              },
              {
                icon: <FiEyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
                title: "No Third-Party Trackers",
                description: "Zero reliance on external cookies, pixels, or tracking scripts"
              },
              {
                icon: <FiServer className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />,
                title: "Anonymous Event Logging",
                description: "Events are recorded without personal identifiers unless absolutely required"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-0.5 sm:mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute -right-16 sm:-right-20 -top-16 sm:-top-20 w-40 sm:w-48 md:w-64 h-40 sm:h-48 md:h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -left-16 sm:-left-20 -bottom-16 sm:-bottom-20 w-40 sm:w-48 md:w-64 h-40 sm:h-48 md:h-64 bg-white/10 rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">The Branqly Advantage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    title: "Regulatory Compliance",
                    description: "Fully aligned with privacy laws and regulations"
                  },
                  {
                    title: "User Trust & Loyalty",
                    description: "Builds lasting confidence with privacy-conscious audiences"
                  },
                  {
                    title: "Reduced Security Risks",
                    description: "Minimized data collection means less exposure in breaches"
                  },
                  {
                    title: "Competitive Differentiation",
                    description: "Stand out as an ethical leader in your industry"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <FiCheckCircle className="text-blue-300 mt-0.5 sm:mt-1 mr-2 sm:mr-3 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                    <div>
                      <h3 className="font-bold text-sm sm:text-base md:text-lg mb-0.5 sm:mb-1">{item.title}</h3>
                      <p className="text-blue-100 text-xs sm:text-sm md:text-base">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            How We Compare
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm md:text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Traditional Analytics</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Branqly</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { feature: "Data Collection", traditional: "Individual-level tracking", ashortl: "Aggregate patterns only" },
                  { feature: "Third-Party Sharing", traditional: "Common with advertisers", ashortl: "Never" },
                  { feature: "User Consent", traditional: "Complex cookie banners required", ashortl: "Minimal consent needed" },
                  { feature: "Data Retention", traditional: "Indefinite by default", ashortl: "Automatic anonymization" }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium text-gray-900 text-xs sm:text-sm md:text-base">{row.feature}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-600 text-xs sm:text-sm md:text-base">{row.traditional}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-blue-600 font-medium text-xs sm:text-sm md:text-base">{row.ashortl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100 mx-auto max-w-2xl">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Ready to Upgrade Your Analytics?</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
              Join thousands of ethical businesses using Branqly&#39;s privacy-first approach to link analytics.
            </p>
            <Link href="/payment" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg inline-block text-sm sm:text-base">
              Get Started Privacy-First
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
