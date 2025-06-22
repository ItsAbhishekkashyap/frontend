'use client';

import { useEffect, useState } from 'react';
import { FiCopy, FiExternalLink, FiTrash2, FiBarChart2, FiLink, FiClock, FiActivity, FiLock, FiCreditCard, FiGlobe, FiEdit2, FiAlertCircle, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ClickTrendChart from '@/components/ClickTrendChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import QrCodeButton from '@/components/QrCodeButton';

import LinkDetailsCard from '@/components/LinkDetailsCard';
import CustomDomainInput from '@/components/CustomDomainInput';
import Meta from '@/components/Meta';



type ClickDetail = {
    timestamp: string | Date;
    country?: string;
    region?: string;
    city?: string;
    device?: string;
    ip?: string;
};


type LinkType = {
    _id: string;
    originalUrl: string;
    alias: string;
    createdAt: string;
    clicks: number;
    lastAccessed: string | null;
    clickDetails?: ClickDetail[];
    domainUsed?: string;

};









const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL ?? 'https://branqly.xyz';

export default function Dashboard() {

    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [premium, setPremium] = useState(false);
    const [alias, setAlias] = useState(''); // renamed from 'slug'
    const [error, setError] = useState('');
    const [links, setLinks] = useState<LinkType[]>([]);
    const [activeTab, setActiveTab] = useState('links');
    const [customDomain, setCustomDomain] = useState('');
    const [isDomainVerified, setIsDomainVerified] = useState(false);
    const [fullShortUrl, setFullShortUrl] = useState('');

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [linkToDelete, setLinkToDelete] = useState<string | null>(null);





    // Get base URL and user info
    useEffect(() => {
        async function fetchUserAndLinks() {
            try {
                const res = await fetch('/api/auth/me', { credentials: 'include' });
                const user = await res.json();

                if (user?.user?.userId) {
                    setPremium(user.user.premium === true || user.user.premium === 'true');
                    console.log('Premium status:', user.user.premium);
                }

                const linksRes = await fetch('/api/links/user', { credentials: 'include' });
                if (linksRes.ok) {
                    const linkData = await linksRes.json();
                    setLinks(linkData.links);
                }

                const domainRes = await fetch('/api/user/custom-domain', { credentials: 'include' });
                if (domainRes.ok) {
                    const domainData = await domainRes.json();
                    if (domainData.customDomain && domainData.isDomainVerified) {
                        setCustomDomain(domainData.customDomain);
                        setIsDomainVerified(domainData.isDomainVerified);
                    }
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            }
        }

        fetchUserAndLinks();
    }, []);


    // async function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();
    //     setError('');
    //     setAlias('');

    //     try {
    //         const res = await fetch('/api/links/create', {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 originalUrl,
    //                 ...(customAlias ? { customAlias } : {}),
    //                 domainUsed: customDomain || undefined,
    //             }),
    //         });

    //         const data = await res.json();
    //         if (!res.ok) {
    //             setError(data.error || 'Failed to shorten URL');
    //             return;
    //         }

    //         setAlias(data.alias);
    //         setOriginalUrl('');
    //         setCustomAlias('');
    //         // DO NOT update setCustomDomain here!

    //         setLinks((prev) => [
    //             {
    //                 _id: data._id,
    //                 originalUrl: data.originalUrl,
    //                 alias: data.alias,
    //                 createdAt: data.createdAt,
    //                 clicks: data.clicks || 0,
    //                 lastAccessed: data.lastAccessed || null,
    //                 domainUsed: data.domainUsed || '', // <-- add domainUsed for this link only
    //             },
    //             ...prev,
    //         ]);

    //     } catch {
    //         setError('Something went wrong');
    //     }
    // }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setAlias('');

        try {
            const res = await fetch('/api/links/create', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalUrl,
                    ...(customAlias ? { customAlias } : {}),
                    domainUsed: customDomain || undefined,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed to shorten URL');
                return;
            }

            setAlias(data.alias);
            setOriginalUrl('');
            setCustomAlias('');

            // ✅ This is the main fix: setFullShortUrl using backend response
            setFullShortUrl(`https://${data.domainUsed}/${data.alias}`);

            setLinks((prev) => [
                {
                    _id: data._id,
                    originalUrl: data.originalUrl,
                    alias: data.alias,
                    createdAt: data.createdAt,
                    clicks: data.clicks || 0,
                    lastAccessed: data.lastAccessed || null,
                    domainUsed: data.domainUsed || '', // this ensures correct domain in Links tab
                },
                ...prev,
            ]);

        } catch {
            setError('Something went wrong');
        }
    }


    const handleDeleteClick = (alias: string) => {
        setLinkToDelete(alias);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (!linkToDelete) return;

        try {
            const res = await fetch('/api/links/delete', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alias: linkToDelete }),
            });

            if (res.ok) {
                setLinks((prev) => prev.filter((link) => link.alias !== linkToDelete));
            } else {
                console.error('Failed to delete the link.');
            }
        } catch (error) {
            console.error('Error deleting the link:', error);
        } finally {
            setShowConfirmModal(false);
            setLinkToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setLinkToDelete(null);
    };


    console.log('slug passed to ClickTrendChart:', alias);




    const normalizedCustomDomain = customDomain
        .trim()
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, ''); // remove trailing slash

    // const displayDomain =
    //     premium && isDomainVerified && normalizedCustomDomain !== ''
    //         ? normalizedCustomDomain
    //         : baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');





    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

            <Meta 
        title="Dashboard | Manage Your Links - Branqly"
        description="Access your Branqly dashboard to manage, edit, and analyze your shortened links effortlessly."
      />
      <h1 style={{ display: 'none' }}>Branqly User Dashboard</h1>

            {/* Header  */}
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-8">Branqly</h1>

                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('links')}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition ${activeTab === 'links' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <FiLink className="mr-3" />
                                    My Links
                                </button>
                                <button
                                    onClick={() => setActiveTab('analytics')}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <FiBarChart2 className="mr-3" />
                                    Analytics
                                </button>

                                {premium && (
                                    <Link href="/payment/status"
                                        onClick={() => setActiveTab('payments')}
                                        className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition ${activeTab === 'payments' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <FiCreditCard className="mr-3" />
                                        Your Payments
                                        <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                            Premium
                                        </span>
                                    </Link>
                                )}
                            </nav>


                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* URL Shortener Card */}
                        {/* URL Shortener Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 transform transition-all hover:shadow-xl">
                            <motion.h2
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text "
                            >
                                Shorten Your URL
                            </motion.h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label htmlFor="originalUrl" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                                        <FiGlobe className="mr-2 text-indigo-500" />
                                        Destination URL
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="originalUrl"
                                            value={originalUrl}
                                            onChange={(e) => setOriginalUrl(e.target.value)}
                                            placeholder="https://example.com/long-url"
                                            className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-gray-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all shadow-sm hover:border-indigo-300 pl-12"
                                            required
                                        />
                                        <FiLink className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </motion.div>

                                {premium && (
                                    <CustomDomainInput selectedDomain={customDomain} setSelectedDomain={setCustomDomain} />
                                )}

                                {premium && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label htmlFor="customAlias" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                                            <FiEdit2 className="mr-2 text-indigo-500" />
                                            Custom Alias (optional)
                                        </label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium">
                                                {normalizedCustomDomain !== '' ? `${normalizedCustomDomain}/` : `${baseUrl.replace(/^https?:\/\//, '')}/`}
                                            </span>

                                            <input
                                                type="text"
                                                id="customAlias"
                                                value={customAlias}
                                                onChange={(e) => setCustomAlias(e.target.value)}
                                                placeholder="mylink"
                                                className="flex-1 min-w-0 block w-full px-4 py-3.5 text-gray-700 rounded-r-xl border border-gray-200 focus:ring-indigo-300 focus:border-indigo-400 shadow-sm hover:border-indigo-300"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-4 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                                >
                                    <FiLink className="mr-3 text-lg" />
                                    <span className="font-semibold">Shorten URL</span>
                                </motion.button>
                            </form>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 flex items-start"
                                    >
                                        <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0 text-red-500" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {alias && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 shadow-sm"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <FiCheckCircle className="text-green-500 mr-2 text-xl" />
                                            <p className="text-sm font-semibold text-gray-700">Your shortened URL</p>
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                            Active
                                        </span>
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.005 }}
                                        className="flex items-center bg-white p-4 rounded-xl border border-gray-200 shadow-xs"
                                    >
                                        <a
                                            href={fullShortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-indigo-600 font-semibold truncate hover:underline text-lg"
                                        >
                                            {fullShortUrl}
                                        </a>
                                        <div className="flex space-x-3 ml-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(fullShortUrl);

                                                }}
                                                className="p-2.5 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center"
                                                title="Copy to clipboard"
                                            >

                                                <FiCopy className="text-indigo-600 text-xl" />

                                            </motion.button>
                                            <motion.a
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                href={fullShortUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2.5 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center"
                                                title="Open in new tab"
                                            >
                                                <FiExternalLink className="text-indigo-600 text-xl" />
                                            </motion.a>
                                        </div>
                                    </motion.div>

                                    <div className="mt-4 flex items-center text-sm text-gray-500">
                                        <FiClock className="mr-2 text-indigo-400" />
                                        <span>Created just now • </span>
                                        <FiBarChart2 className="ml-3 mr-2 text-indigo-400" />
                                        <span>0 clicks</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Links/Content Section */}
                        {activeTab === 'links' ? (
                            premium ? (
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <h2 className="text-xl font-semibold text-gray-800">My Links</h2>
                                            <div className="text-sm text-gray-500">
                                                {links.length} {links.length === 1 ? 'link' : 'links'}
                                            </div>
                                        </div>
                                    </div>

                                    {links.length > 0 ? (
                                        <div className="divide-y divide-gray-200">
                                            {links.map((link) => {
                                                // Normalize domain to avoid double https://
                                                const normalizedDomainForLink = link.domainUsed
                                                    ? link.domainUsed.replace(/^https?:\/\//, '').replace(/\/$/, '')
                                                    : baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

                                                const shortUrl = `https://${normalizedDomainForLink}/${link.alias}`;


                                                return (
                                                    <motion.div
                                                        key={link._id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="p-4 sm:p-6 hover:bg-gray-50 transition"
                                                    >
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                    <a
                                                                        href={shortUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="font-medium text-indigo-600 hover:underline break-all"
                                                                    >
                                                                        {shortUrl}
                                                                    </a>
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                                                        {link.clicks} clicks
                                                                    </span>
                                                                </div>
                                                                <a
                                                                    href={link.originalUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm text-gray-500 hover:text-gray-700 break-all block"
                                                                >
                                                                    {link.originalUrl}
                                                                </a>
                                                                <div className="flex flex-wrap items-center mt-2 text-xs text-gray-500 gap-2">
                                                                    <div className="flex items-center">
                                                                        <FiClock className="mr-1" />
                                                                        <span>Created {new Date(link.createdAt).toLocaleDateString()}</span>
                                                                    </div>
                                                                    {link.lastAccessed && (
                                                                        <div className="flex items-center">
                                                                            <FiActivity className="mr-1" />
                                                                            <span>Last clicked {new Date(link.lastAccessed).toLocaleDateString()}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2 shrink-0">
                                                                <button
                                                                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                                                                    className="p-2 rounded-lg hover:bg-gray-100 transition"
                                                                    title="Copy shortened URL"
                                                                    aria-label="Copy shortened URL"
                                                                >
                                                                    <FiCopy className="text-gray-500 hover:text-gray-700" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteClick(link.alias)}
                                                                    className="p-2 rounded-lg hover:bg-red-50 transition"
                                                                    title="Delete link"
                                                                    aria-label="Delete link"
                                                                >
                                                                    <FiTrash2 className="text-red-500 hover:text-red-700" />
                                                                </button>

                                                                {showConfirmModal && (
                                                                    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">

                                                                        <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm animate-fadeIn">
                                                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                                                                <FiAlertTriangle className="text-yellow-500 mr-2" /> Confirm Delete
                                                                            </h3>
                                                                            <p className="text-gray-600 mb-6 text-sm">
                                                                                Are you sure you want to delete this link? This action cannot be undone.
                                                                            </p>
                                                                            <div className="flex justify-end gap-3">
                                                                                <button
                                                                                    onClick={cancelDelete}
                                                                                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                                <button
                                                                                    onClick={confirmDelete}
                                                                                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-sm flex items-center"
                                                                                >
                                                                                    <FiTrash2 className="mr-1" /> Delete
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}



                                                                {/* QR Code Button */}
                                                                <QrCodeButton url={shortUrl} id={link._id} />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center">
                                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <FiLink className="text-gray-400 text-3xl" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">No links yet</h3>
                                            <p className="text-gray-500 max-w-md mx-auto">
                                                Create your first shortened URL by entering a long URL above.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // 🔒 Locked for non-premium users
                                <div className="text-center py-12 bg-white rounded-xl shadow-sm p-6">
                                    <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                        <FiLock className="text-yellow-500 text-3xl" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">Upgrade Required</h3>
                                    <p className="text-gray-500 max-w-md mx-auto mb-4">
                                        Viewing your created links is a premium feature. Upgrade your account to unlock access.
                                    </p>
                                    <Link
                                        href="/pricing"
                                        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition"
                                    >
                                        Upgrade to Premium
                                    </Link>
                                </div>
                            )
                        ) : premium ? (
                            <div className="bg-white rounded-xl shadow-sm p-6">


                                {links.length > 0 ? (
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="bg-indigo-50 rounded-lg p-4">
                                                <p className="text-sm font-medium text-indigo-700 mb-1">Total Links</p>
                                                <p className="text-2xl font-bold text-indigo-900">{links.length}</p>
                                            </div>
                                            <div className="bg-green-50 rounded-lg p-4">
                                                <p className="text-sm font-medium text-green-700 mb-1">Total Clicks</p>
                                                <p className="text-2xl font-bold text-green-900">
                                                    {links.reduce((sum, link) => sum + link.clicks, 0)}
                                                </p>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-4">
                                                <p className="text-sm font-medium text-purple-700 mb-1">Most Popular</p>
                                                <p className="text-lg font-bold text-purple-900 truncate">
                                                    {links.length > 0
                                                        ? `${premium && isDomainVerified && customDomain ? `https://${customDomain}` : baseUrl}/${links.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current).alias}`
                                                        : '-'}
                                                </p>
                                            </div>
                                        </div>

                                        {links.map((link) => (
                                            <div key={link._id} className="border border-gray-200 mb-4 rounded-lg p-4">
                                                <h3 className="text-lg font-medium text-gray-800 mb-4">
                                                    Click Trends for {link.alias}
                                                </h3>
                                                <ClickTrendChart alias={link.alias} />
                                                <LinkDetailsCard key={link._id} link={link} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <FiBarChart2 className="text-gray-400 text-3xl" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No analytics data yet</h3>
                                        <p className="text-gray-500 max-w-md mx-auto">
                                            Create some links and start tracking their performance.
                                        </p>
                                    </div>
                                )}
                            </div>

                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm p-6">
                                <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                    <FiLock className="text-yellow-500 text-3xl" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">Upgrade Required</h3>
                                <p className="text-gray-500 max-w-md mx-auto mb-4">
                                    Analytics is a premium feature. Upgrade to unlock detailed performance insights.
                                </p>
                                <Link
                                    href="/pricing"
                                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition"
                                >
                                    Upgrade to Premium
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Footer section */}
            <Footer />
        </div>
    );
}



