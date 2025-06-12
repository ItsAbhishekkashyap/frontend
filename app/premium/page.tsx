'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiStar, FiShield, FiBarChart2, FiGlobe } from 'react-icons/fi';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface RazorpayOptions {
  key: string;
  amount?: number;
  currency?: string;
  name: string;
  description: string;
  order_id?: string;
  subscription_id?: string;
  handler: (response: Record<string, unknown>) => void;
  prefill?: {
    email: string;
  };
  theme?: {
    color: string;
  };
}

interface RazorpayInstance {
  open(): void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function PremiumPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [upgraded, setUpgraded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          
        });
        if (!res.ok) throw new Error('Not authenticated');
        const data = await res.json();
        if (data.user?.premium) setUpgraded(true);
        setUserEmail(data.user?.email || 'user@example.com');
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const handleUpgrade = async () => {
    setUpgrading(true);
    setError(null);

    try {
      const orderRes = await fetch('/api/payment/order', { method: 'POST' });
      const order = await orderRes.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: 'Branqly',
        description: 'Premium Subscription',
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setUpgraded(true);
            toast.success('Premium Activated Successfully!');
          } else {
            setError('Payment verification failed.');
            toast.error('Payment Verification Failed!');
          }
        },
        prefill: { email: userEmail },
        theme: { color: '#6366f1' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      setError('Error initiating payment.');
      toast.error('Error Initiating Payment.');
    } finally {
      setUpgrading(false);
    }
  };

  const handleAutoRenew = async () => {
    setUpgrading(true);
    setError(null);

    try {
      const subRes = await fetch('/api/payment/create-subscription', { method: 'POST' });
      const subscription = await subRes.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        subscription_id: subscription.id,
        name: 'Branqly Premium',
        description: 'Auto-renew Monthly Subscription',
        handler: async (response) => {
          const verifyRes = await fetch('/api/payment/verify-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setUpgraded(true);
            toast.success('Subscription Activated Successfully!');
          } else {
            setError('Subscription verification failed.');
            toast.error('Subscription Verification Failed!');
          }
        },
        prefill: { email: userEmail },
        theme: { color: '#6366f1' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      setError('Error creating subscription.');
      toast.error('Error Creating Subscription.');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg text-gray-700">Loading your premium status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-600">Branqly Premium</h2>
          <p className="mt-4 text-gray-600">Unlock all premium features:</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: FiZap, text: 'Faster Link Analytics' },
              { icon: FiCheck, text: 'Unlimited Branded Links' },
              { icon: FiStar, text: 'Custom Domain Support' },
              { icon: FiShield, text: 'Enhanced Security' },
              { icon: FiBarChart2, text: 'Advanced Reports' },
              { icon: FiGlobe, text: 'Global CDN Performance' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white rounded-xl shadow flex items-center space-x-4"
              >
                <feature.icon className="text-indigo-600 w-6 h-6" />
                <span className="text-gray-700">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {!upgraded ? (
            <div className="mt-10 flex flex-col space-y-4">
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
              >
                {upgrading ? 'Processing...' : 'Upgrade to Premium (One-Time)'}
              </button>
              <button
                onClick={handleAutoRenew}
                disabled={upgrading}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
              >
                {upgrading ? 'Processing...' : 'Subscribe Monthly (Auto Renew)'}
              </button>
            </div>
          ) : (
            <p className="mt-8 text-green-600 font-semibold">🎉 You are a Premium User!</p>
          )}

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}












