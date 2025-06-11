"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow">
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
          </div>
          <div className="max-w-5xl mx-auto px-4 relative text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Building a Scalable Link Shortener
            </h1>
            <p className="text-indigo-100 max-w-3xl mx-auto">
              A deep dive into designing systems that handle millions of clicks daily without breaking a sweat.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              URL shorteners are everywhere – from marketing campaigns to social media posts. But handling millions of daily clicks requires more than a simple database. In this post, we explore the core components required to build a scalable, reliable, and high-performance link shortener.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Architecture</h2>
            <p className="text-gray-700">
              A scalable link shortener must be built on a distributed architecture. A basic design includes:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Load Balancer to distribute incoming requests</li>
              <li>Multiple application servers to handle URL generation and redirection</li>
              <li>Highly-available NoSQL/Redis database for quick access to URL mappings</li>
              <li>Caching layer (e.g., Redis) to reduce database load</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Handling High Traffic</h2>
            <p className="text-gray-700">
              The system should auto-scale based on traffic spikes, such as viral content or marketing campaigns. Implementing CDN edge caching for frequently accessed links drastically reduces backend load.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ensuring Reliability</h2>
            <p className="text-gray-700">
              Downtime damages trust. Techniques like database replication, server redundancy, and consistent monitoring ensure that the shortener remains available 24/7.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security & Abuse Prevention</h2>
            <p className="text-gray-700">
              Short URLs can be exploited for phishing or spamming. Implementing link validation, domain whitelisting, and malware detection ensures user safety and platform integrity.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
          >
            <h3 className="font-bold text-gray-700 text-lg mb-4">Recommended Tech Stack</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><b>Frontend:</b> Next.js, React, TailwindCSS</li>
              <li><b>Backend:</b> Node.js, Express</li>
              <li><b>Database:</b> Redis, MongoDB</li>
              <li><b>Infrastructure:</b> Vercel, AWS Lambda, Cloudflare CDN</li>
            </ul>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 my-12"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-3">
              <li className="flex items-start"><span className="text-indigo-600 mr-2">•</span><span className="text-gray-600">Scalable systems require distributed architecture and caching layers.</span></li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">•</span><span className="text-gray-600">Edge caching with CDN can reduce server load dramatically.</span></li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">•</span><span className="text-gray-600">Proactive security measures prevent abuse and protect users.</span></li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">•</span><span className="text-gray-600">High availability requires redundancy, replication, and monitoring.</span></li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
