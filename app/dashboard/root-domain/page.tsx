'use client';

import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

interface RootDomain {
  domain: string;
  verified: boolean;
}

const RootDomainPage = () => {
  const [domain, setDomain] = useState('');
  const [rootDomains, setRootDomains] = useState<RootDomain[]>([]);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    // Fetch existing root domains on page load
    const fetchDomains = async () => {
      try {
        const res = await axios.get('/api/user/root-domain');
        setRootDomains(res.data.rootDomains);
      } catch (err) {
        console.error('Error fetching domains:', err);
      }
    };
    fetchDomains();
  }, []);

  const addDomain = async () => {
    try {
      const res = await axios.post('/api/user/root-domain', { domain });
      setRootDomains(res.data.rootDomains);
      setDomain('');
    } catch (err) {
      console.error('Error adding domain:', err);
    }
  };

  const verifyDomain = async (domain: string) => {
    try {
      const res = await axios.post('/api/user/root-domain/verify', { domain });
      setRootDomains(res.data.rootDomains);
      alert('Domain Verified Successfully ✅');
    } catch (err) {
      console.error('Verification failed:', err);
      alert('Verification Failed ❌');
    }
  };

  const copyToClipboard = (workerCode: string) => {
    navigator.clipboard.writeText(workerCode);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const removeDomain = async (removeDomain: string) => {
    try {
      const res = await axios.delete('/api/user/root-domain', { data: { domain: removeDomain } });
      setRootDomains(res.data.rootDomains);
    } catch (err) {
      console.error('Error removing domain:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Setup Root Domain</h1>

      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter root domain (e.g. brand.com)"
        className="w-full p-3 border rounded mb-4"
      />
      <button
        onClick={addDomain}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add Domain
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Your Root Domains:</h2>
        {rootDomains.length === 0 && <p>No root domains added yet.</p>}
        {rootDomains.map((d) => {
          const workerCode = `addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === '/branqly-health-check') {
    return event.respondWith(new Response('OK', { status: 200 }));
  }
  event.respondWith(
    fetch('https://go.branqly.xyz' + url.pathname)
  );
});`;
          return (
            <motion.div
              key={d.domain}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border p-4 rounded mb-4"
            >
              <div className="flex justify-between items-center">
                <span>{d.domain} {d.verified ? '✅ Verified' : '❌ Not Verified'}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => verifyDomain(d.domain)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => removeDomain(d.domain)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <pre className="bg-gray-100 p-2 mt-2 text-sm rounded overflow-x-auto">
                {workerCode}
              </pre>
              <button
                onClick={() => copyToClipboard(workerCode)}
                className="mt-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Copy Worker Script
              </button>
              {copySuccess && <p className="text-green-500 mt-1">{copySuccess}</p>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RootDomainPage;

