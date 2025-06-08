'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiLock, FiLink2, FiBarChart2, FiPieChart, FiAlertTriangle, FiCode } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const documentationSections = [
  {
    title: "Authentication",
    description: "Learn how to authenticate using API tokens securely",
    icon: <FiLock className="text-indigo-500" size={20} />,
    link: "/docs/authentication"
  },
  {
    title: "Shorten URLs",
    description: "Endpoints, request bodies, and responses",
    icon: <FiLink2 className="text-indigo-500" size={20} />,
    link: "/docs/shorten"
  },
  {
    title: "Analytics",
    description: "Access detailed stats for each short link",
    icon: <FiBarChart2 className="text-indigo-500" size={20} />,
    link: "/docs/analytics"
  },
  {
    title: "Rate Limits",
    description: "Understand request limits and throttling",
    icon: <FiPieChart className="text-indigo-500" size={20} />,
    link: "/docs/rate-limits"
  },
  {
    title: "Error Codes",
    description: "Common error formats and how to handle them",
    icon: <FiAlertTriangle className="text-indigo-500" size={20} />,
    link: "/docs/errors"
  }
];

export default function DocumentationPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Navbar/>
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-4xl mx-auto py-16 px-6 sm:px-8"
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Developer Documentation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive documentation to integrate, build, and scale with ShortLink.
          </p>
        </motion.div>

        <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-6 mb-12">
          {documentationSections.map((section, index) => (
            <Link href={section.link} key={index} passHref>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start">
                  <div className="bg-indigo-50 p-2 rounded-lg mr-4">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{section.title}</h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={fadeIn} className="bg-indigo-50 rounded-xl p-8 text-center border border-indigo-100">
          <div className="flex justify-center mb-4">
            <FiCode className="text-indigo-600" size={32} />
          </div>
          <h3 className="text-xl font-medium text-indigo-800 mb-3">Need live API examples?</h3>
          <p className="text-indigo-600 mb-6">Explore our interactive API playground with real endpoints.</p>
          <Link href="/api" passHref>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Visit API Playground
            </motion.button>
          </Link>
        </motion.div>
      </motion.main>
      <Footer/>
    </div>
  );
}
