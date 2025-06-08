"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';

// export const metadata = {
//   title: "Pricing | AshrtL – Affordable Link Management",
//   description: "Discover flexible pricing plans for AshrtL. Start free, upgrade as you grow.",
//   keywords: ["AshrtL pricing", "link shortener plans", "premium short link", "custom domain"],
//   openGraph: {
//     title: "AshrtL Pricing",
//     description: "Affordable link shortening and tracking solutions.",
//     url: "https://ashrtl.xyz/pricing",
//     type: "website",
//     images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AshrtL Pricing" }],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@AshrtL",
//     title: "AshrtL Pricing",
//     description: "Affordable short link management",
//     images: ["/og-image.png"],
//   },
// };

export default function Price() {
    const [upgrading, setUpgrading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        } catch {
            setError('Something went wrong.');
        } finally {
            setUpgrading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Premium Badge */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-center">
                        <span className="text-white font-semibold uppercase tracking-wider text-sm">
                            Most Popular
                        </span>
                    </div>

                    <div className="p-8">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Premium Plan</h2>
                            <p className="text-gray-600">Unlock all features with our premium offering</p>
                            
                            <div className="mt-6">
                                <div className="flex justify-center items-end">
                                    <span className="text-5xl font-bold text-gray-900">$9.99</span>
                                    <span className="ml-2 text-gray-500 text-lg">/month</span>
                                </div>
                                <p className="text-gray-500 text-sm mt-2">billed monthly</p>
                            </div>
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
                            className={`w-full flex items-center justify-center py-4 px-6 rounded-xl font-semibold transition-all ${upgrading ? 'bg-indigo-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'}`}
                        >
                            {upgrading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Upgrade Now'
                            )}
                        </motion.button>

                        <ul className="mt-8 space-y-3">
                            <li className="flex items-start">
                                <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">No long-term commitment</span>
                            </li>
                            <li className="flex items-start">
                                <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Cancel anytime</span>
                            </li>
                            <li className="flex items-start">
                                <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">7-day money back guarantee</span>
                            </li>
                            <li className="flex items-start">
                                <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">Priority customer support</span>
                            </li>
                            <li className="flex items-start">
                                <FiCheck className="mt-1 mr-3 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">All premium features included</span>
                            </li>
                        </ul>

                        <div className="mt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                Secure payment processing. We never store your card details.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}