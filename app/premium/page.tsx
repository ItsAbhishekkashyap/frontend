'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiArrowRight, FiStar, FiShield, FiBarChart2, FiGlobe } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PremiumPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [upgraded, setUpgraded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Not authenticated');
        const data = await res.json();
        if (data.user?.premium) setUpgraded(true);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const handleUpgrade = async () => {
    setUpgrading(true);
    setError(null);
    try {
      const res = await fetch('/api/user/upgrade', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError(error || 'Failed to upgrade');
        setUpgrading(false);
        return;
      }

      setUpgraded(true);
    } catch {
      setError('Something went wrong.');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg text-gray-700">Loading your premium status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full mb-4">
            <FiZap className="text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Premium Membership</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {upgraded ? 'You have unlocked exclusive premium features!' : 'Upgrade to unlock powerful features'}
          </p>
        </div>

        {upgraded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8 sm:p-10 text-center">
              <div className="inline-flex items-center justify-center bg-green-100 text-green-600 p-4 rounded-full mb-6">
                <FiCheck className="text-3xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Premium Activated!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for being a valued premium member. Enjoy your exclusive benefits.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard <FiArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Features List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Benefits</h2>
              <ul className="space-y-6">
                {[
                  { icon: <FiStar className="text-indigo-500" />, title: "Priority Support", desc: "Get faster responses from our support team" },
                  { icon: <FiShield className="text-indigo-500" />, title: "Advanced Security", desc: "Enhanced protection for your links and data" },
                  { icon: <FiBarChart2 className="text-indigo-500" />, title: "Detailed Analytics", desc: "Access to comprehensive link performance metrics" },
                  { icon: <FiGlobe className="text-indigo-500" />, title: "Global Reach", desc: "Custom domains for your short links" },
                ].map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 bg-indigo-50 p-2 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Upgrade Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
                <p className="opacity-90">Unlock all features for just</p>
                <div className="flex items-end mt-2">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="ml-2 opacity-80">/month</span>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-white/10 rounded-lg text-white mb-6"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpgrade}
                disabled={upgrading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition ${upgrading ? 'bg-indigo-400' : 'bg-white text-indigo-600 hover:bg-white/90'}`}
              >
                {upgrading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Upgrade Now'
                )}
              </motion.button>

              <ul className="mt-6 space-y-2 text-white/90">
                <li className="flex items-center">
                  <FiCheck className="mr-2" /> No long-term commitment
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-2" /> Cancel anytime
                </li>
                <li className="flex items-center">
                  <FiCheck className="mr-2" /> 7-day money back guarantee
                </li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
      <Footer/>
    </div>
  );
}







