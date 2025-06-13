'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCode, FiBarChart2, FiZap, FiLink2, FiLayers, FiSmartphone } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const guideCategories = [
  {
    title: "For Developers",
    icon: <FiCode className="text-indigo-500" size={24} />,
    guides: [
      { title: "Integrating Branqly API with Node.js", icon: <FiZap className="text-indigo-400" /> },
      { title: "Creating branqly links from a browser extension", icon: <FiLayers className="text-indigo-400" /> },
      { title: "Automating link generation using Zapier", icon: <FiLink2 className="text-indigo-400" /> }
    ]
  },
  {
    title: "For Businesses",
    icon: <FiBarChart2 className="text-indigo-500" size={24} />,
    guides: [
      { title: "Tracking campaign clicks via UTM parameters", icon: <FiBarChart2 className="text-indigo-400" /> },
      { title: "Creating branded branqly links", icon: <FiLink2 className="text-indigo-400" /> },
      { title: "Generating QR codes for offline distribution", icon: <FiSmartphone className="text-indigo-400" /> }
    ]
  }
];

export default function GuidesPage() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
        <Navbar/>
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-4xl mx-auto py-16 px-6 sm:px-8"
      >
        <motion.div variants={fadeIn}>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 text-center">
            Getting Started Guides
          </h1>
          <motion.p 
            variants={fadeIn}
            className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto"
          >
            Step-by-step guides to help you use ShortLink effectively, whether you&#39;re a developer, marketer, or business user.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {guideCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 flex items-center">
                <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{category.title}</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <ul className="space-y-4">
                  {category.guides.map((guide, guideIndex) => (
                    <motion.li 
                      key={guideIndex}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-1 mr-3">
                        {guide.icon}
                      </div>
                      <span className="text-gray-700 hover:text-indigo-600 transition-colors">
                        {guide.title}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View all {category.title.toLowerCase()} guides
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={fadeIn}
          className="mt-16 bg-indigo-50 rounded-xl p-8 text-center border border-indigo-100"
        >
          <h3 className="text-xl font-medium text-indigo-800 mb-3">Need personalized help?</h3>
          <p className="text-indigo-600 mb-4">Our team is ready to assist you with custom implementations.</p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Contact Support
          </Link>
        </motion.div>
      </motion.main>

      <Footer/>
    </div>
  );
}
