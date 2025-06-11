"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiEyeOff, FiServer, FiCheckCircle, FiBarChart2, FiSmartphone } from "react-icons/fi";
import Link from "next/link";

export default function PrivacyFirstAnalytics() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-indigo-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern-lock.svg')] bg-[length:120px_120px]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FiShield className="text-white" />
              <span className="text-white text-sm font-medium">Privacy by Design</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy-First Analytics
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Powerful insights without compromising user privacy — the ethical way to track engagement
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiLock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Why Privacy Matters</h3>
                <p className="text-gray-600">
                  In an era of data breaches, respecting user privacy is both ethical and essential for compliance.
                </p>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="space-y-4 text-gray-700">
                <p>
                  At Ashrtl, we&#39;ve reimagined analytics to provide valuable insights while upholding the highest privacy standards. Our approach aligns with global regulations like GDPR and CCPA, ensuring you never have to choose between data and ethics.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800">
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
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Privacy-Preserving Techniques
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <FiBarChart2 className="w-6 h-6 text-green-600" />,
                title: "Aggregated Data Only",
                description: "We analyze trends from non-identifiable group data rather than individual behavior"
              },
              {
                icon: <FiSmartphone className="w-6 h-6 text-purple-600" />,
                title: "On-Device Processing",
                description: "Analytics computations occur locally when possible to minimize data transmission"
              },
              {
                icon: <FiEyeOff className="w-6 h-6 text-red-600" />,
                title: "No Third-Party Trackers",
                description: "Zero reliance on external cookies, pixels, or tracking scripts"
              },
              {
                icon: <FiServer className="w-6 h-6 text-amber-600" />,
                title: "Anonymous Event Logging",
                description: "Events are recorded without personal identifiers unless absolutely required"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
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
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">The Ashrtl Advantage</h2>
              <div className="grid md:grid-cols-2 gap-6">
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
                    <FiCheckCircle className="text-blue-300 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-blue-100">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Comparison Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            How We Compare
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traditional Analytics</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AshrtL</th>
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
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.traditional}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-medium">{row.ashortl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Upgrade Your Analytics?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of ethical businesses using Ashrtl&#39;s privacy-first approach to link analytics.
            </p>
            <Link href="/pricing" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
              Get Started Privacy-First
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}