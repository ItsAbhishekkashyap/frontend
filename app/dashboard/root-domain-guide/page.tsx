'use client';

import React from 'react';
import { motion } from 'framer-motion';

const RootDomainGuidePage = () => {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">
                🌐 Setup Guide: Using Your Root Domain with Branqly
            </h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 text-gray-800"
            >
                <p>
                    Follow this step-by-step guide to fully connect and route your <strong>own root domain (e.g., brand.com)</strong> to your Branqly account using Cloudflare Workers.
                </p>

                {/* Step 1 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">🔹 Step 1: Add Domain to Cloudflare</h2>
                    <ol className="list-decimal ml-6 space-y-1">
                        <li>Go to <a href="https://dash.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Cloudflare Dashboard</a>.</li>
                        <li>Add your domain (example: <strong>brand.com</strong>) by following their DNS setup instructions.</li>
                        <li>Change your Nameservers to Cloudflare’s as instructed.</li>
                    </ol>
                </div>

                {/* Step 2 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">🔹 Step 2: Create a Cloudflare Worker</h2>
                    <ol className="list-decimal ml-6 space-y-1">
                        <li>Go to <strong>Workers & Pages</strong> in Cloudflare.</li>
                        <li>Click <strong>Create a Service</strong>.</li>
                        <li>Choose <strong>&#34;HTTP Handler&#34;</strong>.</li>
                        <li>Name it something like: <strong>root-domain-forwarder</strong>.</li>
                        <li>Click <strong>Create Service</strong>.</li>
                    </ol>
                </div>

                {/* Step 3 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">🔹 Step 3: Replace Worker Code</h2>
                    <p>Replace the default code with this:</p>
                   <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === '/branqly-health-check') {
    return event.respondWith(new Response('OK', { status: 200 }));
  }
  event.respondWith(
    fetch('https://go.branqly.xyz/api/root-domain?domain=brand.com&path=' + url.pathname)
  );
});`}
</pre>

                    <p className="mt-2">Then click <strong>Deploy</strong>.</p>
                </div>

                {/* Step 4 */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">🔹 Step 4: Route Your Domain</h2>
                    <ol className="list-decimal ml-6 space-y-1">
                        <li>In your Worker Service, go to <strong>Triggers</strong>.</li>
                        <li>Click <strong>Add Route</strong>.</li>
                        <li>Enter: <code>brand.com/*</code> (replace with your real domain).</li>
                        <li>Select your Worker: <strong>root-domain-forwarder</strong>.</li>
                        <li>Click <strong>Save</strong>.</li>
                    </ol>
                </div>

                {/* Final Note */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700 font-medium">Note:</p>
                    <p className="text-sm">
                        All traffic to <strong>brand.com/*</strong> will now be forwarded to Branqly — where you can control and manage all your short links!
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RootDomainGuidePage;
