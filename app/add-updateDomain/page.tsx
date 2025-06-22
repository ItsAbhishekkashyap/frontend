'use client';

import React, { useState } from 'react';
import Meta from '@/components/Meta';

export default function CustomDomainSettings() {
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  async function saveDomain() {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/user/custom-domain/update', {
        method: 'POST',
        body: JSON.stringify({ customDomain: domain }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Domain saved! Please add the CNAME record and then verify.');
      } else {
        setMessage(data.error || '❌ Failed to save domain.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error occurred while saving domain.');
    }
    setLoading(false);
  }

  async function verifyDomain() {
    if (!domain) {
      setMessage('❗ Please enter and save your domain first.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/user/custom-domain/verify', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.verified) {
        setMessage('✅ Domain verified successfully!');
      } else {
        setMessage(data.error || '❌ Verification failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error occurred during verification.');
    }
    setLoading(false);
  }

  return (
    <div>

      <Meta 
        title="Add or Update Custom Domain | Branqly"
        description="Easily add or update your custom domain on Branqly and personalize your shortened links."
      />
      <h1 style={{ display: 'none' }}>Add or Update Domain on Branqly</h1>
      <input
        type="text"
        placeholder="Enter your custom domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
        disabled={loading}
      />

      <div className="mt-3 flex space-x-2 max-w-md">
        <button
          onClick={saveDomain}
          disabled={loading || !domain.trim()}
          className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          Save Domain
        </button>

        <button
          onClick={verifyDomain}
          disabled={loading || !domain.trim()}
          className="p-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Verify DNS
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-gray-700 max-w-md">{message}</p>}

      <div className="mt-4 text-sm text-gray-500 max-w-md">
        Please create a <strong>CNAME</strong> record in your DNS with:<br />
        <code>{domain || 'yourdomain.com'} → cname.branqly.xyz</code><br />
        Then click Verify DNS.
      </div>
    </div>
  );
}

