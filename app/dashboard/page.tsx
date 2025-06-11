


// 'use client';

// import { useEffect, useState } from 'react';
// import { FiCopy, FiExternalLink } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import ClickTrendChart from '@/components/ClickTrendChart';

// type LinkType = {
//     _id: string;
//     originalUrl: string;
//     alias: string;
//     createdAt: string;
//     clicks: number;
//     lastAccessed: string | null;
// };

// export default function Dashboard() {
//     const [originalUrl, setOriginalUrl] = useState('');
//     const [customAlias, setCustomAlias] = useState('');
//     const [premium, setPremium] = useState(false);
//     const [slug, setSlug] = useState('');
//     const [error, setError] = useState('');
//     const [baseUrl, setBaseUrl] = useState('');
//     const [links, setLinks] = useState<LinkType[]>([]);

//     // Get base URL and user info
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             setBaseUrl(window.location.origin);
//         }

//         async function fetchUserAndLinks() {
//             const res = await fetch('/api/auth/me', { credentials: 'include' });
//             const user = await res.json();

//             if (user?.user?.id) {
//                 setPremium(user.user.premium);

//                 const linksRes = await fetch('/api/links/user', { credentials: 'include' });
//                 if (linksRes.ok) {
//                     const linkData = await linksRes.json();
//                     setLinks(linkData.links);
//                 }
//             }
//         }

//         fetchUserAndLinks();
//     }, []);

//     async function handleSubmit(e: React.FormEvent) {
//         e.preventDefault();
//         setError('');
//         setSlug('');

//         try {
//             const res = await fetch('/api/links/create', {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     originalUrl,
//                     ...(customAlias ? { customAlias } : {})
//                 }),
//             });

//             const data = await res.json();
//             if (!res.ok) {
//                 setError(data.error || 'Failed to shorten URL');
//                 return;
//             }

//             setSlug(data.slug);
//             setOriginalUrl('');
//             setCustomAlias('');

//             setLinks((prev) => [
//                 {
//                     _id: data._id,
//                     originalUrl: data.originalUrl,
//                     alias: data.slug,
//                     createdAt: data.createdAt,
//                     clicks: data.clicks || 0,
//                     lastAccessed: data.lastAccessed || null,
//                 },
//                 ...prev,
//             ]);
//         } catch {
//             setError('Something went wrong');
//         }
//     }

//     async function handleDelete(alias: string) {
//         const res = await fetch(`/api/links/${alias}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if (res.ok) {
//             setLinks((prev) => prev.filter((link) => link.alias !== alias));
//         } else {
//             console.error('Failed to delete');
//         }
//     }



//     const fullShortUrl = slug ? `${baseUrl}/${slug}` : '';

//     return (
//         <main className="max-w-5xl mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

//             {/* Shorten URL form */}
//             <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
//                 <input
//                     type="text"
//                     value={originalUrl}
//                     onChange={(e) => setOriginalUrl(e.target.value)}
//                     placeholder="Enter original URL"
//                     className="w-full border p-2 rounded"
//                     required
//                 />

//                 {premium && (
//                     <input
//                         type="text"
//                         value={customAlias}
//                         onChange={(e) => setCustomAlias(e.target.value)}
//                         placeholder="Custom alias (optional)"
//                         className="w-full border p-2 rounded"
//                     />
//                 )}

//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Shorten URL
//                 </button>
//             </form>

//             {slug && (
//                 <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     transition={{ duration: 0.3 }}
//                     className="mt-8 p-4 bg-indigo-50 rounded-lg"
//                 >
//                     <p className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</p>
//                     <div className="flex items-center">
//                         <a
//                             href={fullShortUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex-1 text-indigo-600 font-medium truncate hover:underline"
//                         >
//                             {fullShortUrl}
//                         </a>
//                         <div className="flex space-x-2 ml-2">
//                             <button
//                                 onClick={() => navigator.clipboard.writeText(fullShortUrl)}
//                                 className="p-2 rounded-full hover:bg-indigo-100 transition"
//                                 title="Copy to clipboard"
//                             >
//                                 <FiCopy className="text-indigo-600" />
//                             </button>
//                             <a
//                                 href={fullShortUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="p-2 rounded-full hover:bg-indigo-100 transition"
//                                 title="Open in new tab"
//                             >
//                                 <FiExternalLink className="text-indigo-600" />
//                             </a>
//                         </div>
//                     </div>
//                 </motion.div>
//             )}

//             {error && <p className="text-red-600 mt-2">{error}</p>}

//             {/* Shortened URLs Table */}
//             <div className="mt-10 overflow-x-auto">
//                 <h2 className="text-xl font-semibold mb-4">Your Shortened URLs</h2>
//                 <table className="min-w-full text-sm text-left border border-gray-300">
//                     <thead className="bg-gray-800 text-white">
//                         <tr>
//                             <th className="py-2 px-4 border">Original URL</th>
//                             <th className="py-2 px-4 border">Short URL</th>
//                             <th className="py-2 px-4 border">Created At</th>
//                             <th className="py-2 px-4 border">Clicks</th>
//                             <th className="py-2 px-4 border">Last Accessed</th>
//                             <th className="py-2 px-4 border">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {links.map((link) => (
//                             <tr key={link._id} className="hover:bg-gray-50">
//                                 <td className="py-2 px-4 border max-w-xs truncate">
//                                     <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                                         {link.originalUrl}
//                                     </a>
//                                 </td>
//                                 <td className="py-2 px-4 border text-indigo-700">
//                                     <a
//                                         href={`${baseUrl}/${link.alias}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="hover:underline"
//                                     >
//                                         {baseUrl}/{link.alias}
//                                     </a>
//                                 </td>
//                                 <td className="py-2 px-4 border">{new Date(link.createdAt).toLocaleString()}</td>
//                                 <td className="py-2 px-4 border text-center">{link.clicks}</td>
//                                 <td className="py-2 px-4 border">
//                                     {link.lastAccessed ? new Date(link.lastAccessed).toLocaleString() : '-'}
//                                 </td>
//                                 <td className="py-2 px-4 border">
//                                     <button
//                                         onClick={() => handleDelete(link.alias)}
//                                         className="text-red-600 hover:underline font-medium"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                         {links.length === 0 && (
//                             <tr>
//                                 <td colSpan={6} className="text-center py-4 text-gray-500">
//                                     No links created yet.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="mt-10">
//                 <ClickTrendChart slug={slug} />
//             </div>

//         </main>
//     );
// }


'use client';

import { useEffect, useState } from 'react';
import { FiCopy, FiExternalLink, FiTrash2, FiBarChart2, FiLink, FiClock, FiActivity, FiLock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ClickTrendChart from '@/components/ClickTrendChart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import QrCodeButton from '@/components/QrCodeButton';

type LinkType = {
    _id: string;
    originalUrl: string;
    alias: string;
    createdAt: string;
    clicks: number;
    lastAccessed: string | null;
};

export default function Dashboard() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [premium, setPremium] = useState(false);
    const [slug, setSlug] = useState('');
    const [error, setError] = useState('');
    const [baseUrl, setBaseUrl] = useState('');
    const [links, setLinks] = useState<LinkType[]>([]);
    const [activeTab, setActiveTab] = useState('links');

    // Get base URL and user info
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseUrl(window.location.origin);
        }

        async function fetchUserAndLinks() {
            const res = await fetch('/api/auth/me', { credentials: 'include' });
            const user = await res.json();

            if (user?.user?.id) {
                setPremium(user.user.premium);

                const linksRes = await fetch('/api/links/user', { credentials: 'include' });
                if (linksRes.ok) {
                    const linkData = await linksRes.json();
                    setLinks(linkData.links);
                }
            }
        }

        fetchUserAndLinks();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setSlug('');

        try {
            const res = await fetch('/api/links/create', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalUrl,
                    ...(customAlias ? { customAlias } : {})
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Failed to shorten URL');
                return;
            }

            setSlug(data.slug);
            setOriginalUrl('');
            setCustomAlias('');

            setLinks((prev) => [
                {
                    _id: data._id,
                    originalUrl: data.originalUrl,
                    alias: data.slug,
                    createdAt: data.createdAt,
                    clicks: data.clicks || 0,
                    lastAccessed: data.lastAccessed || null,
                },
                ...prev,
            ]);
        } catch {
            setError('Something went wrong');
        }
    }

    async function handleDelete(alias: string) {
        const res = await fetch('/api/links/delete', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: alias }), // send 'slug' in POST body
        });

        if (res.ok) {
            setLinks((prev) => prev.filter((link) => link.alias !== alias));
        } else {
            console.error('Failed to delete');
        }
    }
    console.log('slug passed to ClickTrendChart:', slug);



    const fullShortUrl = slug ? `${baseUrl}/${slug}` : '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

            {/* Header  */}
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-8">Short.ly</h1>

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
                            </nav>

                            {/* <div className="mt-8 pt-6 border-t border-gray-200">
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center transition">
                                    <FiPlus className="mr-2" />
                                    New Link
                                </button>
                            </div> */}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* URL Shortener Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Shorten a URL</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                        Destination URL
                                    </label>
                                    <input
                                        type="text"
                                        id="originalUrl"
                                        value={originalUrl}
                                        onChange={(e) => setOriginalUrl(e.target.value)}
                                        placeholder="https://example.com/long-url"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        required
                                    />
                                </div>

                                {premium && (
                                    <div>
                                        <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700 mb-1">
                                            Custom Alias (optional)
                                        </label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                {baseUrl}/
                                            </span>
                                            <input
                                                type="text"
                                                id="customAlias"
                                                value={customAlias}
                                                onChange={(e) => setCustomAlias(e.target.value)}
                                                placeholder="mylink"
                                                className="flex-1 min-w-0 block w-full px-3 py-2 text-gray-600 rounded-none rounded-r-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center"
                                >
                                    <FiLink className="mr-2" />
                                    Shorten URL
                                </button>
                            </form>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {slug && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100"
                                >
                                    <p className="text-sm font-medium text-indigo-800 mb-2">Your shortened URL</p>
                                    <div className="flex items-center">
                                        <a
                                            href={fullShortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-indigo-600 font-medium truncate hover:underline"
                                        >
                                            {fullShortUrl}
                                        </a>
                                        <div className="flex space-x-2 ml-2">
                                            <button
                                                onClick={() => navigator.clipboard.writeText(fullShortUrl)}
                                                className="p-2 rounded-lg hover:bg-indigo-100 transition"
                                                title="Copy to clipboard"
                                            >
                                                <FiCopy className="text-indigo-600" />
                                            </button>
                                            <a
                                                href={fullShortUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg hover:bg-indigo-100 transition"
                                                title="Open in new tab"
                                            >
                                                <FiExternalLink className="text-indigo-600" />
                                            </a>
                                        </div>
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
                                            {links.map((link) => (
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
                                                                    href={`${baseUrl}/${link.alias}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="font-medium text-indigo-600 hover:underline break-all"
                                                                >
                                                                    {baseUrl}/{link.alias}
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
                                                                onClick={() => navigator.clipboard.writeText(`${baseUrl}/${link.alias}`)}
                                                                className="p-2 rounded-lg hover:bg-gray-100 transition"
                                                                title="Copy"
                                                            >
                                                                <FiCopy className="text-gray-500 hover:text-gray-700" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(link.alias)}
                                                                className="p-2 rounded-lg hover:bg-red-50 transition"
                                                                title="Delete"
                                                            >
                                                                <FiTrash2 className="text-red-500 hover:text-red-700" />
                                                            </button>

                                                            {/* QR Code Button */}
                                                            <QrCodeButton url={`${baseUrl}/${link.alias}`} id={link._id} />

                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
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
                        )
                            : premium ? (


                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Analytics</h2>
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
                                                            ? `${baseUrl}/${links.reduce((prev, current) => (prev.clicks > current.clicks) ? prev : current).alias}`
                                                            : '-'
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {links.map((link) => (
                                                <div key={link._id} className="border border-gray-200 rounded-lg p-4">
                                                    <h3 className="text-lg font-medium text-gray-800 mb-4">Click Trends for {link.alias}</h3>
                                                    <ClickTrendChart slug={link.alias} />
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



