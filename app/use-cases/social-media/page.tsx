import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const SocialMediaUseCase = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transform skew-y-3 -rotate-3 origin-top-left"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Social Media Links, 
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Supercharged
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your social media presence with elegant, trackable links that captivate audiences and drive engagement.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl  duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
              <div className="bg-blue-100/80 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Concise Sharing</h3>
              <p className="text-gray-600">Perfect for Twitter&#39;s character limits and Instagram&#39;s clean aesthetic. No more ugly, truncated links.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl  duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
              <div className="bg-purple-100/80 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Actionable Analytics</h3>
              <p className="text-gray-600">Track clicks, locations, and devices to understand what content resonates with your audience.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl  duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
              <div className="bg-amber-100/80 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Branded Links</h3>
              <p className="text-gray-600">Create custom short URLs like <span className="font-mono bg-gray-100 px-2 py-1 rounded-md text-sm">ashrtl.vercel.app/sale</span> that reinforce your brand.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl  duration-300 border border-gray-100 transform hover:-translate-y-2 transition-transform">
              <div className="bg-green-100/80 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Platform Insights</h3>
              <p className="text-gray-600">Discover which social networks drive the most traffic to optimize your posting strategy.</p>
            </div>
          </div>

          {/* Example Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 shadow-inner">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="bg-white p-5 rounded-2xl shadow-lg border border-blue-200">
                    <div className="bg-blue-600 text-white rounded-xl p-4 text-center">
                      <p className="font-mono text-sm truncate">ashrtl.vercel.app/summer-sale</p>
                    </div>
                    <div className="mt-3 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Twitter Post</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">See It In Action</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Promoting your summer sale? Use a branded short link that&#39;s memorable, fits perfectly in limited spaces, and gives you detailed analytics about your audience&#39;s engagement across different platforms.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Twitter', 'Instagram', 'LinkedIn', 'TikTok'].map((platform) => (
                      <span key={platform} className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-200">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Social Links?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of marketers and creators who are already boosting their engagement with our powerful link shortening platform.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all transform hover:scale-105">
              Get Started for Free
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SocialMediaUseCase;