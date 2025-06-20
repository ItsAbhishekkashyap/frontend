'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface CustomDomain {
  domain: string;
  isVerified: boolean;
  cnameTarget?: string;
}

interface CustomDomainInputProps {
  selectedDomain: string;
  setSelectedDomain: (val: string) => void;
}

export default function CustomDomainInput({
  selectedDomain,
  setSelectedDomain,
}: CustomDomainInputProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customDomains, setCustomDomains] = useState<CustomDomain[]>([]);

  useEffect(() => {
    async function fetchDomains() {
      try {
        const res = await fetch('/api/user/custom-domain', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch domains');
        const data = await res.json();
        // Expecting data.customDomains to be an array
        setCustomDomains(data.customDomains || []);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchDomains();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading domain info...</p>;
  if (error) return <p className="text-sm text-red-500">Error: {error}</p>;

  // Always include default domain first
  const domainOptions = [{ domain: 'branqly.xyz', isVerified: true }, ...customDomains];

  return (
    <div className="mb-4 max-w-md">
      <label htmlFor="domainSelect" className="block text-sm font-medium text-gray-700 mb-1">
        Select Custom Domain (Optional)
      </label>
      <div className="flex items-center space-x-2">
        <select
          id="domainSelect"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          {domainOptions.map(({ domain }) => (
            <option key={domain} value={domain}>
              {domain === 'branqly.xyz' ? 'Default (branqly.xyz)' : domain}
            </option>
          ))}
        </select>
        <Link
          href="/dashboard/custom-domain"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
        >
          Add Domain
        </Link>
      </div>
    </div>
  );
}



