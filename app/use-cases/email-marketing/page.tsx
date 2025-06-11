import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const EmailMarketingUseCase = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:100px_100px]"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Elevate Your Email Marketing
                            </h1>
                            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                Transform your email campaigns with professional, trackable links that boost engagement and build trust.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Benefits Section */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Why Short Links <span className="text-blue-600">Matter</span> in Emails
                            </h2>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Appearance</h3>
                                        <p className="text-gray-600">
                                            Long URLs appear spammy and can break across lines. Our clean links maintain your email&#39;s polished look.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Enhanced Trust</h3>
                                        <p className="text-gray-600">
                                            Custom branded links (e.g., <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">yourbrand.link/offer</span>) increase recipient confidence.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-3 rounded-lg mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Actionable Analytics</h3>
                                        <p className="text-gray-600">
                                            Track opens, clicks, and conversions to measure campaign effectiveness and optimize your strategy.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-amber-100 p-3 rounded-lg mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">QR Code Integration</h3>
                                        <p className="text-gray-600">
                                            Generate QR codes for print materials or hybrid campaigns, all tracked through the same dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Example Section */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-2xl mx-auto">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-6 border-b border-gray-200">
                                <h3 className="text-2xl font-semibold text-gray-800">Email Marketing Made Simple</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Create clean, branded, and trackable links for your email newsletters and campaigns.
                                </p>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-6">
                                {/* Example Email Content */}
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <p className="text-gray-700 italic text-base">
                                        “Stay updated with our latest features and improvements — check out what&#39;s new!”
                                    </p>
                                </div>

                                {/* Shortened Link Section */}
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="bg-blue-500 rounded-full w-3 h-3 mr-3"></div>
                                        <p className="text-gray-700 font-medium">Your Branded Short Link:</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between shadow-inner">
                                        <span className="font-mono text-blue-600 truncate">ashrtl.vercel.app/summer-sale</span>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow">
                                            Copy Link
                                        </button>
                                    </div>
                                </div>

                                {/* Note: Analytics Not Available */}
                                <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                                    *Detailed performance tracking will be available in future updates.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* CTA Section */}
                <div className=" bg-blue-50  py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-slate-600 mb-6">Ready to Transform Your Email Campaigns?</h2>
                        <p className="text-xl text-slate-600 mb-8">
                            Join thousands of marketers who trust our platform to deliver professional, high-performing links.
                        </p>
                        <div className="space-x-4">
                            <Link href="/" className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors">
                                Get Started Free
                            </Link>
                            <Link href="/pricing" className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-8 rounded-lg text-lg border border-gray-600 transition-colors">
                                See Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmailMarketingUseCase;