'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { FiCopy, FiCheck, FiAlertCircle, FiGlobe, FiPlus, FiRefreshCw, FiLink, FiChevronRight, FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { FiBook, FiExternalLink, FiMessageSquare, FiArrowRight, FiClock, FiCheckCircle, FiHelpCircle, FiServer, FiPlusCircle } from 'react-icons/fi'
import { BsFillRocketFill } from 'react-icons/bs';
import Link from 'next/link';

interface Domain {
    domain: string;
    isVerified: boolean;
    cnameTarget?: string;
    verificationError?: string;
}

type ApiResponse = {
    customDomains: Domain[];
    error?: string;
};

export default function CustomDomainPage() {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newDomain, setNewDomain] = useState<string>('');
    const [saving, setSaving] = useState<boolean>(false);
    const [verifyLoading, setVerifyLoading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'domains' | 'guide'>('domains');
    const [copiedDomain, setCopiedDomain] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDomains() {
            try {
                const res = await fetch('/api/user/custom-domain', { credentials: 'include' });
                if (!res.ok) throw new Error('Failed to fetch domains');
                const data: ApiResponse = await res.json();
                setDomains(data.customDomains || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        }
        fetchDomains();
    }, []);

    async function addDomain() {
        if (!newDomain.trim()) return;

        setSaving(true);
        try {
            const res = await fetch('/api/user/custom-domain/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customDomain: newDomain.trim() }),
            });
            const data: ApiResponse = await res.json();

            if (res.ok) {
                setDomains(data.customDomains || []);
                setNewDomain('');
                setActiveTab('guide');
            } else {
                setError(data.error || 'Failed to add domain');
            }
        } catch (err) {
            console.error(err);
            setError('Error saving domain');
        } finally {
            setSaving(false);
        }
    }

    async function verifyDomain(domainToVerify: string) {
        setVerifyLoading(domainToVerify);
        try {
            const res = await fetch('/api/user/custom-domain/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domainToVerify }),
            });
            const data: { verified: boolean; error?: string } = await res.json();

            if (res.ok && data.verified) {
                setDomains(prev => prev.map(d =>
                    d.domain === domainToVerify ? { ...d, isVerified: true, verificationError: undefined } : d
                ));
            } else {
                setDomains(prev => prev.map(d =>
                    d.domain === domainToVerify ? { ...d, verificationError: data.error } : d
                ));
            }
        } catch {
            setDomains(prev => prev.map(d =>
                d.domain === domainToVerify ? { ...d, verificationError: 'DNS verification failed' } : d
            ));
        } finally {
            setVerifyLoading(null);
        }
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        setCopiedDomain(text);
        setTimeout(() => setCopiedDomain(null), 2000);
    }

    if (loading) return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-indigo-50">
            <Navbar />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="p-6 sm:p-8 border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text ">
                            Custom Domains
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Connect your own domain to personalize your short links
                        </p>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('domains')}
                            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'domains' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Your Domains
                        </button>
                        <button
                            onClick={() => setActiveTab('guide')}
                            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'guide' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Setup Guide
                        </button>
                    </div>

                    <div className="p-6 sm:p-8">
                        {activeTab === 'domains' ? (
                            <div className="space-y-6">
                                <div className="bg-indigo-50 rounded-xl p-5">
                                    <h2 className="text-lg font-semibold text-indigo-800 mb-3 flex items-center">
                                        <FiPlus className="mr-2" /> Add New Domain
                                    </h2>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-grow relative">
                                            <FiGlobe className="absolute left-3 top-1/2  transform -translate-y-1/2 text-gray-600" />
                                            <input
                                                type="text"
                                                value={newDomain}
                                                onChange={(e) => setNewDomain(e.target.value)}
                                                placeholder="yourdomain.com"
                                                className="w-full pl-10 pr-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={addDomain}
                                            disabled={saving || !newDomain.trim()}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 flex-shrink-0"
                                        >
                                            {saving ? 'Adding...' : 'Add Domain'}
                                        </motion.button>
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-red-50 border-l-4 border-red-500 p-4"
                                    >
                                        <div className="flex items-center">
                                            <FiAlertCircle className="text-red-500 mr-2" />
                                            <p className="text-red-700">{error}</p>
                                        </div>
                                    </motion.div>
                                )}

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Connected Domains</h3>

                                    {domains.length === 0 ? (
                                        <div className="text-center py-10 bg-gray-50 rounded-xl">
                                            <FiGlobe className="mx-auto text-gray-400 text-4xl mb-3" />
                                            <p className="text-gray-500">No domains added yet</p>
                                        </div>
                                    ) : (
                                        <ul className="space-y-3">
                                            {domains.map((domain) => (
                                                <motion.li
                                                    key={domain.domain}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    <div className="p-5">
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                            <div className="flex items-center">
                                                                <div className={`w-3 h-3 rounded-full mr-3 ${domain.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                                                <span className="font-medium text-gray-900">{domain.domain}</span>
                                                                {domain.isVerified ? (
                                                                    <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center">
                                                                        <FiCheck className="mr-1" /> Verified
                                                                    </span>
                                                                ) : (
                                                                    <span className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                                                        Pending
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {!domain.isVerified && (
                                                                <motion.button
                                                                    whileHover={{ scale: 1.03 }}
                                                                    whileTap={{ scale: 0.97 }}
                                                                    onClick={() => verifyDomain(domain.domain)}
                                                                    disabled={verifyLoading === domain.domain}
                                                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center"
                                                                >
                                                                    {verifyLoading === domain.domain ? (
                                                                        <>
                                                                            <FiRefreshCw className="animate-spin mr-2" /> Verifying...
                                                                        </>
                                                                    ) : (
                                                                        'Verify Now'
                                                                    )}
                                                                </motion.button>
                                                            )}
                                                        </div>

                                                        {!domain.isVerified && (
                                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                                <p className="text-sm text-gray-600 mb-2">
                                                                    Add this CNAME record in your DNS settings to verify ownership:
                                                                </p>
                                                                <div className="flex flex-col sm:flex-row gap-2">
                                                                    <div className="flex-grow bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                                                                        <code className="text-sm font-mono text-gray-800">
                                                                            {domain.domain}. <span className="text-gray-500">CNAME</span> {domain.cnameTarget || 'your-cname-target'}
                                                                        </code>
                                                                        <button
                                                                            onClick={() => copyToClipboard(`${domain.domain}. CNAME ${domain.cnameTarget || 'your-cname-target'}`)}
                                                                            className="text-gray-500 hover:text-indigo-600 ml-2"
                                                                        >
                                                                            <FiCopy />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                {copiedDomain === `${domain.domain}. CNAME ${domain.cnameTarget || 'your-cname-target'}` && (
                                                                    <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
                                                                )}
                                                            </div>
                                                        )}

                                                        {domain.verificationError && (
                                                            <div className="mt-3 text-sm text-red-600 flex items-start">
                                                                <FiAlertCircle className="flex-shrink-0 mr-1.5 mt-0.5" />
                                                                {domain.verificationError}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ) : (
                            //   <div className="space-y-8">
                            //     <div className="bg-indigo-50 rounded-xl p-6">
                            //       <h2 className="text-xl font-bold text-indigo-800 mb-3">How to Set Up Your Custom Domain</h2>
                            //       <p className="text-gray-700 mb-4">
                            //         Follow these steps to connect your domain and start using it for your short links.
                            //       </p>

                            //       <div className="space-y-6">
                            //         <div className="flex items-start">
                            //           <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-0.5">
                            //             1
                            //           </div>
                            //           <div>
                            //             <h3 className="font-semibold text-gray-900">Add your domain</h3>
                            //             <p className="text-gray-600 mt-1">
                            //               Enter your domain in the &#34;Your Domains&#34; tab. We&#39;ll provide you with a unique CNAME record.
                            //             </p>
                            //           </div>
                            //         </div>

                            //         <div className="flex items-start">
                            //           <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-0.5">
                            //             2
                            //           </div>
                            //           <div>
                            //             <h3 className="font-semibold text-gray-900">Update DNS records</h3>
                            //             <p className="text-gray-600 mt-1">
                            //               Log in to your domain registrar&#39;s dashboard (like GoDaddy, Namecheap, or Cloudflare) and add the CNAME record we provide.
                            //             </p>
                            //             <div className="mt-3 bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm">
                            //               <div className="flex justify-between items-start">
                            //                 <div>
                            //                   <div>Type: <span className="text-green-300">CNAME</span></div>
                            //                   <div>Name: <span className="text-yellow-300">yourdomain.com</span></div>
                            //                   <div>Value: <span className="text-blue-300">your-unique-target.ourdomain.com</span></div>
                            //                 </div>
                            //                 <button 
                            //                   onClick={() => copyToClipboard("yourdomain.com CNAME your-unique-target.ourdomain.com")}
                            //                   className="text-gray-400 hover:text-white"
                            //                 >
                            //                   <FiCopy />
                            //                 </button>
                            //               </div>
                            //             </div>
                            //           </div>
                            //         </div>

                            //         <div className="flex items-start">
                            //           <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-0.5">
                            //             3
                            //           </div>
                            //           <div>
                            //             <h3 className="font-semibold text-gray-900">Verify your domain</h3>
                            //             <p className="text-gray-600 mt-1">
                            //               After adding the DNS record (which may take up to 48 hours to propagate), click the &#34;Verify&#34; button in your domains list.
                            //             </p>
                            //           </div>
                            //         </div>

                            //         <div className="flex items-start">
                            //           <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-0.5">
                            //             4
                            //           </div>
                            //           <div>
                            //             <h3 className="font-semibold text-gray-900">Start using your domain</h3>
                            //             <p className="text-gray-600 mt-1">
                            //               Once verified, you can use your custom domain for all your short links!
                            //             </p>
                            //           </div>
                            //         </div>
                            //       </div>
                            //     </div>

                            //     <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            //       <div className="flex">
                            //         <div className="flex-shrink-0">
                            //           <FiAlertCircle className="h-5 w-5 text-yellow-400" />
                            //         </div>
                            //         <div className="ml-3">
                            //           <p className="text-sm text-yellow-700">
                            //             <strong>DNS changes may take time</strong> – It can take anywhere from a few minutes to 48 hours for DNS changes to propagate across the internet.
                            //           </p>
                            //         </div>
                            //       </div>
                            //     </div>
                            //   </div>

                            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                                {/* Hero Section */}
                                <div className="text-center mb-12">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                        Configure Your Custom Domain
                                    </h1>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                        Connect your domain to Branqly in just a few simple steps. Follow this guide to set up DNS records correctly.
                                    </p>
                                </div>

                                {/* Visual Timeline */}
                                <div className="relative">
                                    {/* Vertical line */}
                                    <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>

                                    <div className="space-y-10">
                                        {/* Step 1 */}
                                        <div className="relative flex group">
                                            <div className="flex-shrink-0 bg-white rounded-full border-2 border-indigo-500 w-12 h-12 flex items-center justify-center z-10 transition-all duration-300 group-hover:bg-indigo-50 group-hover:scale-110">
                                                <span className="text-indigo-600 font-bold text-lg">1</span>
                                            </div>
                                            <div className="ml-8 flex-1 pb-10">
                                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                        <FiPlusCircle className="text-indigo-500 mr-2" />
                                                        Add your domain
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        Enter your domain in the &#34;Your Domains&#34; section. We&#34;ll generate a unique CNAME record for you to configure.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 2 */}
                                        <div className="relative flex group">
                                            <div className="flex-shrink-0 bg-white rounded-full border-2 border-indigo-500 w-12 h-12 flex items-center justify-center z-10 transition-all duration-300 group-hover:bg-indigo-50 group-hover:scale-110">
                                                <span className="text-indigo-600 font-bold text-lg">2</span>
                                            </div>
                                            <div className="ml-8 flex-1 pb-10">
                                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                        <FiServer className="text-indigo-500 mr-2" />
                                                        Update DNS records
                                                    </h3>
                                                    <p className="text-gray-600 mb-4">
                                                        Log in to your domain registrar&#39;s dashboard (like GoDaddy, Namecheap, or Cloudflare) and add the following CNAME record:
                                                    </p>

                                                    {/* Interactive DNS Record Card */}
                                                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                                                        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                                                            <span className="text-gray-300 text-sm font-mono">DNS Configuration</span>
                                                            <button
                                                                onClick={() => copyToClipboard("yourdomain.com CNAME your-unique-target.branqly.com")}
                                                                className="text-gray-400 hover:text-white transition-colors flex items-center"
                                                            >
                                                                <FiCopy className="mr-1" /> Copy
                                                            </button>
                                                        </div>
                                                        <div className="p-4 font-mono text-sm text-gray-100">
                                                            <div className="grid grid-cols-3 gap-4 mb-2">
                                                                <span className="text-gray-400">Type:</span>
                                                                <span className="col-span-2 text-green-300">CNAME</span>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-4 mb-2">
                                                                <span className="text-gray-400">Name:</span>
                                                                <span className="col-span-2 text-yellow-300">yourdomain.com</span>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <span className="text-gray-400">Value:</span>
                                                                <span className="col-span-2 text-blue-300">your-unique-target.branqly.com</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Registrar Instructions */}
                                                    <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
                                                        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                                                            <FiHelpCircle className="mr-2" />
                                                            Where to add this in popular registrars:
                                                        </h4>
                                                        <ul className="text-sm text-blue-700 space-y-1">
                                                            <li>• GoDaddy: DNS Management → Records → Add CNAME</li>
                                                            <li>• Cloudflare: DNS → Add record</li>
                                                            <li>• Namecheap: Advanced DNS → Host Records</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 3 */}
                                        <div className="relative flex group">
                                            <div className="flex-shrink-0 bg-white rounded-full border-2 border-indigo-500 w-12 h-12 flex items-center justify-center z-10 transition-all duration-300 group-hover:bg-indigo-50 group-hover:scale-110">
                                                <span className="text-indigo-600 font-bold text-lg">3</span>
                                            </div>
                                            <div className="ml-8 flex-1 pb-10">
                                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                        <FiCheckCircle className="text-indigo-500 mr-2" />
                                                        Verify your domain
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        After adding the DNS record (propagation may take up to 48 hours), click &#34;Verify&#34; in your Branqly domains list.
                                                    </p>
                                                    <div className="mt-4 flex items-center text-sm text-gray-500">
                                                        <FiClock className="mr-2" />
                                                        <span>DNS changes typically propagate within 1-2 hours</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 4 */}
                                        <div className="relative flex group">
                                            <div className="flex-shrink-0 bg-white rounded-full border-2 border-indigo-500 w-12 h-12 flex items-center justify-center z-10 transition-all duration-300 group-hover:bg-indigo-50 group-hover:scale-110">
                                                <span className="text-indigo-600 font-bold text-lg">4</span>
                                            </div>
                                            <div className="ml-8 flex-1">
                                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all duration-300">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                                                        <BsFillRocketFill className="text-indigo-500 mr-2" />
                                                        Start using your domain
                                                    </h3>
                                                    <p className="text-gray-600 mb-3">
                                                        Once verified, your custom domain is ready to use for all Branqly short links!
                                                    </p>
                                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Create your first link
                                                        <FiArrowRight className="ml-2" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Flow Representation */}
                                <div className="mt-16 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                                        How DNS Setup Works
                                    </h2>
                                    <div className="flex flex-col items-center">
                                        <div className="w-full max-w-md">
                                            <div className="flex flex-col items-center space-y-6">
                                                {/* Step 1 */}
                                                <div className="flex items-center w-full">
                                                    <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
                                                        <FiGlobe className="w-5 h-5" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="font-medium text-gray-900">Your Domain</h3>
                                                        <p className="text-sm text-gray-500">example.com</p>
                                                    </div>
                                                    <FiChevronRight className="mx-4 text-gray-400 flex-shrink-0" />
                                                </div>

                                                {/* Step 2 */}
                                                <div className="flex items-center w-full">
                                                    <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
                                                        <FiSettings className="w-5 h-5" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="font-medium text-gray-900">DNS Configuration</h3>
                                                        <p className="text-sm text-gray-500">CNAME Record</p>
                                                    </div>
                                                    <FiChevronRight className="mx-4 text-gray-400 flex-shrink-0" />
                                                </div>

                                                {/* Step 3 */}
                                                <div className="flex items-center w-full">
                                                    <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
                                                        <FiCheckCircle className="w-5 h-5" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="font-medium text-gray-900">Verification</h3>
                                                        <p className="text-sm text-gray-500">Branqly checks DNS</p>
                                                    </div>
                                                    <FiChevronRight className="mx-4 text-gray-400 flex-shrink-0" />
                                                </div>

                                                {/* Step 4 */}
                                                <div className="flex items-center w-full">
                                                    <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
                                                        <FiLink className="w-5 h-5" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="font-medium text-gray-900">Ready to Use</h3>
                                                        <p className="text-sm text-gray-500">Short links active</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Help Section */}
                                <div className="mt-12 bg-gray-50 rounded-xl p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Need help?</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                                                <FiBook className="text-indigo-500 mr-2" />
                                                Documentation
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3">
                                                Read our detailed domain setup guide with screenshots for all major registrars.
                                            </p>
                                            <Link href="#" className="text-indigo-600 text-sm font-medium hover:text-indigo-500 inline-flex items-center">
                                                View docs <FiExternalLink className="ml-1" />
                                            </Link>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                                                <FiMessageSquare className="text-indigo-500 mr-2" />
                                                Contact Support
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3">
                                                Our team is ready to help you with any DNS configuration issues.
                                            </p>
                                            <Link href="/contact-us" className="text-indigo-600 text-sm font-medium hover:text-indigo-500 inline-flex items-center">
                                                Get support <FiExternalLink className="ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}





