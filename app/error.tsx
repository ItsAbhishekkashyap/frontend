'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error captured:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 px-4 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="p-8 bg-white shadow-xl rounded-2xl border border-red-200 max-w-md w-full"
      >
        <motion.div 
          initial={{ rotate: -15 }} 
          animate={{ rotate: 0 }} 
          transition={{ type: 'spring', stiffness: 120 }}
          className="text-red-500 text-6xl mb-4 mx-auto"
        >
          <FiAlertTriangle />
        </motion.div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-3">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          It looks like something broke. Don’t worry, we’re on it! <br />
          You can try again or head back to safety.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="bg-red-500 text-white px-5 py-2 rounded-full shadow hover:bg-red-600 transition"
        >
          🔄 Try Again
        </motion.button>
      </motion.div>
    </div>
  );
}
