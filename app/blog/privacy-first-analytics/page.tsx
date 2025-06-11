"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyFirstAnalytics() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-6 text-center"
        >
          Privacy-First Analytics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 mb-8 text-center"
        >
          Discover how we deliver valuable insights without compromising user privacy.
        </motion.p>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Privacy Matters in Analytics</h2>
          <p className="text-gray-700 leading-relaxed">
            In the age of data breaches and increasing regulations like GDPR and CCPA, respecting user privacy is not
            just an ethical responsibility but a business necessity. At Ashrtl, we prioritize data minimization,
            transparency, and user control in every aspect of our analytics platform.
          </p>
        </motion.section>

        {/* Techniques Used */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Techniques We Use</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Aggregated Data Collection: We only store non-identifiable aggregate data to spot trends, not individual behavior.</li>
            <li>On-Device Processing: Analytics computations can occur locally on the user&#39;s device where possible.</li>
            <li>No Third-Party Trackers: Ashrtl does not rely on third-party cookies or external tracking pixels.</li>
            <li>Anonymous Event Logging: Each event is logged without attaching personal identifiers unless strictly necessary.</li>
          </ul>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits of Privacy-First Analytics</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By focusing on privacy, we ensure long-term trust with our users and comply with global standards. Here are the
            key benefits:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded shadow border">
              <h3 className="font-medium text-blue-600 mb-2">Regulatory Compliance</h3>
              <p className="text-sm text-gray-600">Fully aligned with GDPR, CCPA, and other data protection laws.</p>
            </div>
            <div className="p-4 bg-white rounded shadow border">
              <h3 className="font-medium text-blue-600 mb-2">User Trust</h3>
              <p className="text-sm text-gray-600">Builds user confidence in using our URL shortener platform.</p>
            </div>
            <div className="p-4 bg-white rounded shadow border">
              <h3 className="font-medium text-blue-600 mb-2">Enhanced Security</h3>
              <p className="text-sm text-gray-600">Less personal data reduces risk in case of breaches.</p>
            </div>
            <div className="p-4 bg-white rounded shadow border">
              <h3 className="font-medium text-blue-600 mb-2">Ethical Advantage</h3>
              <p className="text-sm text-gray-600">Promotes ethical data handling, an important factor for modern brands.</p>
            </div>
          </div>
        </motion.section>

        {/* Ashrtl's Approach Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Ashrtl Stands Out</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike other URL shorteners, Ashrtl&#39;s analytics respect privacy by design. Our built-in solutions ensure
            that every click is analyzed without personal surveillance, maintaining ethical and transparent practices.
          </p>
          <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
            <p className="text-indigo-700 font-medium">&#34;Ashrtl: The smarter, privacy-respecting link shortener for the conscious web user.&#34;</p>
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Final Thoughts</h2>
          <p className="text-gray-700 leading-relaxed">
            Privacy-first analytics isn&#39;t just a feature—it&#39;s a commitment to better digital ethics. As the internet
            landscape shifts toward stronger privacy requirements, Ashrtl ensures your links are safe, smart, and
            compliant by default.
          </p>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}