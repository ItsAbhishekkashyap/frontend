'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import Meta from '@/components/Meta';


export default function Price() {
    const [upgrading, setUpgrading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

   const handleUpgrade = () => {
    setUpgrading(true);
    try {
        router.push('/payment');
    } catch (error) {
        setError(error as string);
    }
};

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">

 <Meta 
        title="Branqly Pricing Plans | Affordable Link Management"
        description="Check Branqly's affordable plans to manage and analyze your links with ease."
      />
      <h1 style={{ display: 'none' }}>Branqly Pricing Plans for URL Shortening Services</h1>

            <Navbar />
            
            <main className="flex-grow flex items-center justify-center p-4 py-12">
                <div className="w-full max-w-lg">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Simple, Transparent Pricing</h1>
                        <p className="text-lg text-gray-600 max-w-md mx-auto">
                            Unlock powerful features with our premium plan. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Free Plan */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Free Plan</h2>
                                <p className="text-gray-600 mb-6">Perfect for getting started</p>
                                
                                <div className="mb-8">
                                    <div className="flex justify-start items-end">
                                        <span className="text-4xl font-bold text-gray-900">₹0</span>
                                        <span className="ml-2 text-gray-500">forever</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start">
                                        <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Basic link shortening</span>
                                    </li>
                                    
                                    <li className="flex items-start">
                                        <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Community support</span>
                                    </li>
                                </ul>

                                <button
                                    className="w-full py-3 px-6 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    Your Current Plan
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border-2 border-indigo-500">
                            {/* Popular Badge */}
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-bl-lg">
                                Most Popular
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium Plan</h2>
                                <p className="text-gray-600 mb-6">For power users and businesses</p>
                                
                                <div className="mb-8">
                                    <div className="flex justify-start items-end">
                                        <span className="text-4xl font-bold text-gray-900">₹199</span>
                                        <span className="ml-2 text-gray-500">/month</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">Cancel in a week if not satisfied</p>
                                </div>

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-3 bg-red-50 rounded-lg text-red-600 mb-6 text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleUpgrade}
                                    disabled={upgrading}
                                    className="w-full flex items-center cursor-pointer justify-center py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-md transition-all"
                                >
                                    Upgrade Now
                                    <FiArrowRight className="ml-2" />
                                </motion.button>

                                <ul className="mt-8 space-y-3">
                                    <li className="flex items-start">
                                        <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Advanced analytics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Custom alias support</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Priority support</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Team members</span>
                                    </li>
                                    <li className="flex items-start">
                                        <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">QR code</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-sm">
                            Secure payment processing. We never store your card details. 7-day money back guarantee.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}