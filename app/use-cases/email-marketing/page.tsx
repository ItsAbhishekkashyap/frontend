"use client";
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiBarChart2, FiShield, FiCode, FiCopy, FiArrowRight } from 'react-icons/fi';

const EmailMarketingUseCase = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 py-16 md:py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:80px_80px] md:bg-[length:100px_100px]"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                                Elevate Your Email Marketing
                            </h1>
                            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
                                Transform your email campaigns with professional, trackable links that boost engagement and build trust.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                        {/* Benefits Section */}
                        <div className="lg:w-1/2">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 md:mb-8"
                            >
                                Why Short Links <span className="text-blue-600">Matter</span> in Emails
                            </motion.h2>

                            <div className="space-y-6 md:space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col sm:flex-row items-start gap-4"
                                >
                                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                                        <FiMail className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Professional Appearance</h3>
                                        <p className="text-gray-600">
                                            Long URLs appear spammy and can break across lines. Our clean links maintain your email&#39;s polished look.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-col sm:flex-row items-start gap-4"
                                >
                                    <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                                        <FiShield className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Enhanced Trust</h3>
                                        <p className="text-gray-600">
                                            Custom branded links (e.g., <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">yourbrand.link/offer</span>) increase recipient confidence.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col sm:flex-row items-start gap-4"
                                >
                                    <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                                        <FiBarChart2 className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Actionable Analytics</h3>
                                        <p className="text-gray-600">
                                            Track opens, clicks, and conversions to measure campaign effectiveness and optimize your strategy.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-col sm:flex-row items-start gap-4"
                                >
                                    <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                                        <FiCode className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">QR Code Integration</h3>
                                        <p className="text-gray-600">
                                            Generate QR codes for print materials or hybrid campaigns, all tracked through the same dashboard.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Example Section */}
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-2xl mx-auto"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-4 sm:p-6 border-b border-gray-200">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Email Marketing Made Simple</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Create clean, branded, and trackable links for your email newsletters and campaigns.
                                    </p>
                                </div>

                                {/* Body */}
                                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                                    {/* Example Email Content */}
                                    <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                                        <p className="text-gray-700 italic text-sm sm:text-base">
                                            &#34;Stay updated with our latest features and improvements — check out what&#39;s new!&#34;
                                        </p>
                                    </div>

                                    {/* Shortened Link Section */}
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <div className="bg-blue-500 rounded-full w-2 h-2 sm:w-3 sm:h-3 mr-2 sm:mr-3"></div>
                                            <p className="text-gray-700 font-medium text-sm sm:text-base">Your Branded Short Link:</p>
                                        </div>

                                        <div className="bg-gray-100 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-inner">
                                            <span className="font-mono text-blue-600 text-sm sm:text-base truncate w-full sm:w-auto text-center sm:text-left">
                                                ashrtl.vercel.app/summer-sale
                                            </span>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all shadow flex items-center gap-1">
                                                <FiCopy className="w-3 h-3 sm:w-4 sm:h-4" />
                                                <span>Copy</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Note: Analytics Not Available */}
                                    <div className="text-xs sm:text-sm text-gray-500 pt-3 sm:pt-4 border-t border-gray-200">
                                        *Detailed performance tracking will be available in future updates.
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-50 py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl sm:text-3xl font-bold text-slate-600 mb-4 sm:mb-6"
                        >
                            Ready to Transform Your Email Campaigns?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8"
                        >
                            Join thousands of marketers who trust our platform to deliver professional, high-performing links.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
                        >
                            <Link 
                                href="/" 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg text-base sm:text-lg shadow-lg transition-colors flex items-center justify-center gap-2"
                            >
                                Get Started Free
                                <FiArrowRight className="w-4 h-4" />
                            </Link>
                            <Link 
                                href="/pricing" 
                                className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-lg text-base sm:text-lg border border-blue-600 transition-colors"
                            >
                                See Pricing
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default EmailMarketingUseCase;