"use client"
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {motion} from 'framer-motion';
// import Link from 'next/link';

// export const metadata = {
//   title: "Privacy Policy | AshrtL",
//   description: "Read AshrtL's privacy policy to understand how we protect your data and your rights.",
//   keywords: ["privacy policy", "AshrtL privacy", "data protection"],
//   openGraph: {
//     title: "Privacy Policy – AshrtL",
//     description: "How we protect and handle your data at AshrtL.",
//     url: "https://ashrtl.xyz/privacy-policy",
//     type: "website",
//     images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Privacy Policy" }],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@AshrtL",
//     title: "Privacy Policy",
//     description: "Read our commitment to privacy and data protection.",
//     images: ["/og-image.png"],
//   },
// };

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
        <Navbar/>
      <main className="max-w-4xl mx-auto py-16 px-6 sm:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4"
          >
            Our Privacy Commitment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Transparency and trust are at the heart of what we do. Here&#39;s how we protect your data.
          </motion.p>
        </div>

        {/* Policy Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">ShortLink Privacy Policy</h2>
            <p className="text-indigo-100 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                Data Collection
              </h3>
              <p className="text-gray-600">
                We collect only what&#39;s necessary to provide our services. This includes:
              </p>
              <ul className="space-y-3 pl-2">
                {[
                  "Account information (email, name when you register)",
                  "Link creation and click analytics",
                  "Device and browser information for security"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    </div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                Data Protection
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Encryption",
                    content: "All data is encrypted in transit and at rest using industry-standard protocols."
                  },
                  {
                    title: "Access Control",
                    content: "Strict access controls limit who can view your information within our team."
                  },
                  {
                    title: "No Selling",
                    content: "We never sell your data to third parties or advertisers."
                  },
                  {
                    title: "Cookies",
                    content: "Only essential cookies are used to maintain your session and preferences."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-indigo-600 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.content}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Your Rights
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-700 mb-3">You&#39;re in control</h4>
                <ul className="space-y-3">
                  {[
                    "Access all personal data we store about you",
                    
                    
                    "Export your data for transfer to other services",
                    "Opt-out of non-essential communications"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="pt-4">
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Need more information?</h3>
                <p className="text-gray-600 mb-4">
                  For the full legal documentation or specific questions about our privacy practices, please contact our Data Protection Officer.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="mailto:privacy@shortlink.com" 
                    className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    Email Our Privacy Team
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-5 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Contact Form
                  </Link>
                </div> */}
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer/>
    </div>
  );
}