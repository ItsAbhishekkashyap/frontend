"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiBarChart2, FiLink, FiGlobe, FiArrowRight } from 'react-icons/fi';

const SocialMediaUseCase = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transform skew-y-3 -rotate-3 origin-top-left"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Social Media Links,
                </span>{' '}
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Supercharged
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your social media presence with elegant, trackable links that captivate audiences and drive engagement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12 md:mb-16"
          >
            {[
              {
                icon: <FiMessageSquare className="w-6 h-6 text-blue-600" />,
                title: "Concise Sharing",
                description: "Perfect for Twitter's character limits and Instagram's clean aesthetic. No more ugly, truncated links.",
                color: "blue"
              },
              {
                icon: <FiBarChart2 className="w-6 h-6 text-purple-600" />,
                title: "Actionable Analytics",
                description: "Track clicks, locations, and devices to understand what content resonates with your audience.",
                color: "purple"
              },
              {
                icon: <FiLink className="w-6 h-6 text-amber-600" />,
                title: "Branded Links",
                description: "Create custom short URLs that reinforce your brand identity across all platforms.",
                color: "amber"
              },
              {
                icon: <FiGlobe className="w-6 h-6 text-green-600" />,
                title: "Platform Insights",
                description: "Discover which social networks drive the most traffic to optimize your posting strategy.",
                color: "green"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transform transition-all`}
              >
                <div className={`bg-${feature.color}-100/80 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Example Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 md:p-10 shadow-inner overflow-hidden"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg border border-blue-200 w-full max-w-xs">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-3 md:p-4 text-center">
                      <p className="font-mono text-xs md:text-sm truncate">ashrtl.vercel.app/summer-sale</p>
                    </div>
                    <div className="mt-2 md:mt-3 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Twitter Post</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">See It In Action</h2>
                  <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                    Promoting your summer sale? Use a branded short link that&#39;s memorable, fits perfectly in limited spaces, and gives you detailed analytics about your audience&#39;s engagement across different platforms.
                  </p>
                  <div className="flex flex-wrap gap-2 text-gray-500 md:gap-3">
                    {['Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                      <motion.span 
                        key={platform}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-sm border border-gray-200"
                      >
                        {platform}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 md:py-16"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Ready to Transform Your Social Links?</h2>
            <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto">
              Join thousands of marketers and creators who are already boosting their engagement with our powerful link shortening platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              Get Started for Free
              <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default SocialMediaUseCase;