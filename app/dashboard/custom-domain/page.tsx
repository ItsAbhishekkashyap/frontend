'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import { FiCopy, FiCheck, FiAlertCircle, FiGlobe, FiPlus, FiRefreshCw, FiLink, FiChevronRight, FiSettings } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { FiBook, FiExternalLink, FiMessageSquare, FiCheckCircle, FiServer, FiPlusCircle } from 'react-icons/fi'
import { BsFillRocketFill } from 'react-icons/bs';


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


interface StepProps {
  number: number;
  icon: ReactNode;
  title: string;
  description: string;
  extraContent?: ReactNode;
}
    const Step: React.FC<StepProps> = ({ number, icon, title, description, extraContent }) => (
  <div className="relative flex group">
    <div className="flex-shrink-0 bg-white border-2 border-indigo-500 w-12 h-12 flex items-center justify-center rounded-full z-10">
      <span className="text-indigo-600 font-bold text-lg">{number}</span>
    </div>
    <div className="ml-8 flex-1 pb-10">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          {icon} {title}
        </h3>
        <p className="text-gray-600">{description}</p>
        {extraContent && <div className="mt-4">{extraContent}</div>}
      </div>
    </div>
  </div>
);


interface DnsCardProps {
  domain: string;
  cnameTarget: string;
}

const DnsCard: React.FC<DnsCardProps> = ({ domain, cnameTarget }) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden">
    <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
      <span className="text-gray-300 text-sm font-mono">DNS Configuration</span>
      <button
        onClick={() => navigator.clipboard.writeText(`${domain} CNAME ${cnameTarget}`)}
        className="text-gray-400 hover:text-white flex items-center"
      >
        <FiCopy className="mr-1" /> Copy
      </button>
    </div>
    <div className="p-4 font-mono text-sm text-gray-100 space-y-2">
      <p><span className="text-gray-400">Type:</span> <span className="text-green-300">CNAME</span></p>
      <p><span className="text-gray-400">Name:</span> <span className="text-yellow-300">{domain}</span></p>
      <p><span className="text-gray-400">Value:</span> <span className="text-blue-300">{cnameTarget}</span></p>
    </div>
  </div>
);

const DnsVisualFlow: React.FC = () => (
  <div className="mt-16 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">How DNS + SSL Setup Works</h2>
    <div className="flex flex-col items-center space-y-6">
      {[
        { icon: <FiGlobe />, title: "Your Subdomain", desc: "go.yourdomain.com" },
        { icon: <FiSettings />, title: "CNAME Points to Branqly", desc: "cname.branqly.xyz" },
        { icon: <FiCheckCircle />, title: "Branqly Verifies", desc: "We check DNS via lookup" },
        { icon: <FiLink />, title: "SSL & Short Links Ready", desc: "Vercel issues SSL automatically" },
      ].map((step, idx) => (
        <div key={idx} className="flex items-center">
          <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">{step.icon}</div>
          <div className="ml-4">
            <h3 className="font-medium text-gray-900">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.desc}</p>
          </div>
          {idx < 3 && <FiChevronRight className="mx-4 text-gray-400" />}
        </div>
      ))}
    </div>
  </div>
);

const HelpSection: React.FC = () => (
  <div className="mt-12 bg-gray-50 p-6 rounded-xl">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { icon: <FiBook />, title: "Documentation", desc: "Read our detailed guide with screenshots.", link: "#", linkText: "View Docs" },
        { icon: <FiMessageSquare />, title: "Contact Support", desc: "Need DNS help? Reach out to us.", link: "/contact-us", linkText: "Get Support" },
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2 flex items-center">{item.icon} {item.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
          <a href={item.link} className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-500">
            {item.linkText} <FiExternalLink className="ml-1" />
          </a>
        </div>
      ))}
    </div>
  </div>
);

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

    async function deleteDomain(domainToDelete: string) {
        if (!confirm(`Are you sure you want to delete ${domainToDelete}?`)) return;

        try {
            const res = await fetch('/api/user/custom-domain/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domainToDelete }),
            });

            const data = await res.json();

            if (res.ok) {
                // Remove from local state
                setDomains(prev => prev.filter(d => d.domain !== domainToDelete));
            } else {
                setError(data.error || 'Failed to delete domain');
            }
        } catch (err) {
            console.error(err);
            setError('Error deleting domain');
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
                                                            <div className="flex gap-2">
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

                                                                <motion.button
                                                                    whileHover={{ scale: 1.03 }}
                                                                    whileTap={{ scale: 0.97 }}
                                                                    onClick={() => deleteDomain(domain.domain)}
                                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                                                                >
                                                                    Delete
                                                                </motion.button>
                                                            </div>
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
                                        Connect Your Custom Domain to Branqly
                                    </h1>
                                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                        Follow these 4 simple steps to connect and secure your domain with SSL, automatically handled by Branqly.
                                    </p>
                                </div>

                                {/* Timeline Steps */}
                                <div className="space-y-10">

                                    {/* Step 1 */}
                                    <Step
                                        number={1}
                                        icon={<FiPlusCircle className="text-indigo-500 mr-2" />}
                                        title="Add Your Subdomain in Branqly"
                                        description="Enter your subdomain (like go.yourdomain.com) in the 'Custom Domains' section in Branqly Dashboard. This will generate a CNAME configuration for you."
                                    />

                                    {/* Step 2 */}
                                    <Step
                                        number={2}
                                        icon={<FiServer className="text-indigo-500 mr-2" />}
                                        title="Set DNS Record at Your Domain Provider (e.g., Namecheap)"
                                        description="Login to your domain provider (like GoDaddy, Cloudflare, or Namecheap) and set the following CNAME record in DNS:"
                                        extraContent={
                                            <DnsCard domain="go.yourdomain.com" cnameTarget="cname.branqly.xyz" />
                                        }
                                    />

                                    {/* Step 3 */}
                                    <Step
                                        number={3}
                                        icon={<FiCheckCircle className="text-indigo-500 mr-2" />}
                                        title="Verify Domain in Branqly"
                                        description="After DNS setup, return to Branqly and click 'Verify' for the domain. We'll automatically check the CNAME record to confirm setup. DNS changes may take 5 min to 24 hrs to propagate."
                                    />

                                    {/* Step 4 */}
                                    <Step
                                        number={4}
                                        icon={<BsFillRocketFill className="text-indigo-500 mr-2" />}
                                        title="Start Using Your Custom Domain"
                                        description="Once verified, Branqly will automatically provide SSL via our server (Vercel). No extra setup or SSL purchase needed — your short links are now secure!"
                                    />
                                </div>

                                {/* How DNS Works Visual Flow */}
                                <DnsVisualFlow />

                                {/* Help Section */}
                                <HelpSection />
                            </div>

                        )}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}





