import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const PrintMaterialsUseCase = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-amber-600 to-orange-600 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/texture-pattern.svg')] bg-[length:150px_150px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-orange-100">
                  Print Materials
                </span>
                <br />
                <span className="text-white">Reimagined with Smart Links</span>
              </h1>
              <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                Bridge the gap between physical and digital with trackable short links and QR codes for your print campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Benefits Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-10">
                Why <span className="text-orange-600">Short Links</span> Work Better in Print
              </h2>
              
              <div className="space-y-10">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-3 rounded-xl mr-5 flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy-to-Type URLs</h3>
                    <p className="text-gray-600">
                      Short, memorable links that are practical for physical media like flyers, brochures, and posters.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-3 rounded-xl mr-5 flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">QR Code Generation</h3>
                    <p className="text-gray-600">
                      Automatic QR codes for instant scanning convenience. Perfect for posters, business cards, and product packaging.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-purple-100 to-violet-100 p-3 rounded-xl mr-5 flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Offline Tracking</h3>
                    <p className="text-gray-600">
                      Measure print campaign effectiveness with detailed analytics on scans and visits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-green-100 to-teal-100 p-3 rounded-xl mr-5 flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Branded Links</h3>
                    <p className="text-gray-600">
                      Customizable links (e.g., <span className="font-mono bg-gray-100 px-2 py-1 rounded-md text-sm border border-gray-200">ashrtl.vercel.app/summer</span>) that match your campaign theme.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
                <h3 className="text-xl font-semibold text-white">Print Campaign Example</h3>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 flex-1 text-center">
                    <div className="bg-white p-4 inline-block rounded-md">
                      {/* QR Code Placeholder */}
                      <div className="w-32 h-32 bg-gray-300 flex items-center justify-center mx-auto">
                        <span className="text-gray-500 text-xs">QR Code</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">Scan to visit</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-3">Event Flyer</h4>
                    <p className="text-gray-600 mb-4">
                      Include both QR code and short URL for maximum accessibility.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <span className="font-mono text-orange-600">ashrtl.vercel.app/summer-fest</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-4 text-lg">Campaign Performance</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                      <p className="text-2xl font-bold text-amber-600">1,248</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Scans</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-2xl font-bold text-blue-600">842</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Visits</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <p className="text-2xl font-bold text-green-600">63%</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Conversion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gray-900 to-amber-900 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Enhance Your Print Materials?</h2>
            <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto">
              Join businesses worldwide who are bridging the offline-online gap with our powerful link solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="bg-white hover:bg-gray-100 text-amber-700 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all hover:scale-105">
                Get Started Free
              </Link>
              <Link href="/pricing" className="bg-transparent hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-lg text-lg border-2 border-amber-400 transition-colors">
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

export default PrintMaterialsUseCase;