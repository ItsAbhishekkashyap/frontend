// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FiLogOut, FiUser, FiZap, FiLink, FiBarChart2, FiSettings } from 'react-icons/fi';

// export default function Dashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState<{ email?: string; premium?: boolean } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [activeTab, setActiveTab] = useState('links');

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch('/api/auth/me', { credentials: 'include' });
//         if (!res.ok) throw new Error('Not authenticated');
//         const data = await res.json();
//         setUser(data.user || {});
//       } catch {
//         router.push('/login');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, [router]);

//   async function handleLogout() {
//     setLoggingOut(true);
//     await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
//     router.push('/login');
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center mb-4">
//             <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//           </div>
//           <p className="text-lg text-gray-700">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   // Safe way to get username from email
//   const getUsername = () => {
//     if (!user?.email) return 'User';
//     return user.email.split('@')[0] || 'User';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <div className="hidden md:flex md:flex-shrink-0">
//         <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
//           <div className="flex items-center h-16 px-4 border-b border-gray-200">
//             <FiLink className="text-indigo-600 text-xl mr-2" />
//             <h1 className="text-xl font-bold text-gray-900">ShortLink</h1>
//           </div>
//           <div className="flex flex-col flex-grow p-4 overflow-y-auto">
//             <nav className="flex-1 space-y-2">
//               <button
//                 onClick={() => setActiveTab('links')}
//                 className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left ${activeTab === 'links' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
//               >
//                 <FiLink className="mr-3" />
//                 My Links
//               </button>
//               <button
//                 onClick={() => setActiveTab('analytics')}
//                 className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
//               >
//                 <FiBarChart2 className="mr-3" />
//                 Analytics
//               </button>
//               <button
//                 onClick={() => setActiveTab('settings')}
//                 className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
//               >
//                 <FiSettings className="mr-3" />
//                 Settings
//               </button>
//             </nav>
//           </div>
//           <div className="p-4 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-full">
//                   <FiUser className="text-indigo-600" />
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm font-medium text-gray-900">{user?.email || 'User'}</p>
//                   <p className="text-xs text-gray-500">
//                     {user?.premium ? (
//                       <span className="text-indigo-600">Premium</span>
//                     ) : (
//                       <span>Free Account</span>
//                     )}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 disabled={loggingOut}
//                 className="text-gray-400 hover:text-gray-500"
//                 title="Logout"
//               >
//                 <FiLogOut />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navigation (Mobile) */}
//         <div className="md:hidden bg-white shadow-sm">
//           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//             <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
//             <div className="flex items-center space-x-2">
//               <div className="flex-shrink-0 bg-indigo-100 p-1 rounded-full">
//                 <FiUser className="text-indigo-600 text-sm" />
//               </div>
//               <button
//                 onClick={handleLogout}
//                 disabled={loggingOut}
//                 className="text-gray-400 hover:text-gray-500"
//                 title="Logout"
//               >
//                 <FiLogOut />
//               </button>
//             </div>
//           </div>
//           <div className="flex border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('links')}
//               className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'links' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//             >
//               <FiLink className="inline mr-1" /> Links
//             </button>
//             <button
//               onClick={() => setActiveTab('analytics')}
//               className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//             >
//               <FiBarChart2 className="inline mr-1" /> Analytics
//             </button>
//             <button
//               onClick={() => setActiveTab('settings')}
//               className={`flex-1 py-3 text-sm font-medium text-center ${activeTab === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//             >
//               <FiSettings className="inline mr-1" /> Settings
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 overflow-y-auto p-4 md:p-6">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Welcome Card */}
//             <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {getUsername()}!</h2>
//                   <p className="text-gray-600">
//                     {user?.premium ? (
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                         <FiZap className="mr-1" /> Premium Member
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                         Free Account
//                       </span>
//                     )}
//                   </p>
//                 </div>
//                 {!user?.premium && (
//                   <button
//                     onClick={() => router.push('/premium')}
//                     className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                   >
//                     Upgrade to Premium <FiZap className="ml-2" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Tab Content */}
//             {activeTab === 'links' && (
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-medium text-gray-900">My Links</h3>
//                   <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
//                     + New Link
//                   </button>
//                 </div>
//                 {/* Links list would go here */}
//                 <div className="text-center py-12 text-gray-500">
//                   <FiLink className="mx-auto text-4xl mb-3 text-gray-300" />
//                   <p>You haven&#39;t created any links yet</p>
//                   <button 
//                     onClick={() => router.push('/')}
//                     className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//                   >
//                     Create your first link
//                   </button>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'analytics' && (
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-6">Analytics</h3>
//                 {/* Analytics content would go here */}
//                 <div className="text-center py-12 text-gray-500">
//                   <FiBarChart2 className="mx-auto text-4xl mb-3 text-gray-300" />
//                   <p>No analytics data available yet</p>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'settings' && (
//               <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//                     <div className="mt-1 flex rounded-md shadow-sm">
//                       <input
//                         type="email"
//                         value={user?.email || ''}
//                         readOnly
//                         className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//                     <div className="mt-1">
//                       {user?.premium ? (
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
//                           <FiZap className="mr-1" /> Premium Account
//                         </span>
//                       ) : (
//                         <div className="flex items-center">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-3">
//                             Free Account
//                           </span>
//                           <button
//                             onClick={() => router.push('/premium')}
//                             className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
//                           >
//                             Upgrade <FiZap className="ml-1" />
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

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

  async function handleDelete(id: string) {
    const res = await fetch(`/api/links/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setLinks((prev) => prev.filter((link) => link._id !== id));
    } else {
      console.error('Failed to delete');
    }
  }

  const fullShortUrl = slug ? `${baseUrl}/${slug}` : '';

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Shorten URL form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter original URL"
          className="w-full border p-2 rounded"
          required
        />

        {premium && (
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="Custom alias (optional)"
            className="w-full border p-2 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Shorten URL
        </button>
      </form>

      {slug && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-8 p-4 bg-indigo-50 rounded-lg"
        >
          <p className="text-sm font-medium text-gray-700 mb-2">Your shortened URL:</p>
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
                className="p-2 rounded-full hover:bg-indigo-100 transition"
                title="Copy to clipboard"
              >
                <FiCopy className="text-indigo-600" />
              </button>
              <a
                href={fullShortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-indigo-100 transition"
                title="Open in new tab"
              >
                <FiExternalLink className="text-indigo-600" />
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {/* Shortened URLs Table */}
      <div className="mt-10 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Your Shortened URLs</h2>
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border">Original URL</th>
              <th className="py-2 px-4 border">Short URL</th>
              <th className="py-2 px-4 border">Created At</th>
              <th className="py-2 px-4 border">Clicks</th>
              <th className="py-2 px-4 border">Last Accessed</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border max-w-xs truncate">
                  <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {link.originalUrl}
                  </a>
                </td>
                <td className="py-2 px-4 border text-indigo-700">
                  <a
                    href={`${baseUrl}/${link.alias}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {baseUrl}/{link.alias}
                  </a>
                </td>
                <td className="py-2 px-4 border">{new Date(link.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4 border text-center">{link.clicks}</td>
                <td className="py-2 px-4 border">
                  {link.lastAccessed ? new Date(link.lastAccessed).toLocaleString() : '-'}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(link._id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {links.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No links created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}



