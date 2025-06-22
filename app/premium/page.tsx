'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheck, FiZap, FiStar, FiShield, FiBarChart2, FiGlobe } from 'react-icons/fi';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';

// Minimal type declarations for Razorpay
type RazorpayInstance = {
  open: () => void;
};

type RazorpayOptions = {
  key: string;
  amount?: number;
  currency?: string;
  name: string;
  description: string;
  order_id?: string;
  subscription_id?: string;
  handler: (response: Record<string, unknown>) => void;
  prefill?: { email: string };
  theme?: { color: string };
};



declare const Razorpay: {
  new (options: RazorpayOptions): RazorpayInstance;
};

export default function PremiumPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [upgraded, setUpgraded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Fetch user and premium status
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) throw new Error('Not authenticated');
        const { user } = await res.json();
        if (user.premium) setUpgraded(true);
        setUserEmail(user.email);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  // Handle Razorpay payment
  const handlePayment = async (isSubscription: boolean) => {
    setUpgrading(true);
    setError(null);
    
    try {
      // Determine endpoint based on payment type
      const endpoint = isSubscription 
        ? '/api/payment/create-subscription' 
        : '/api/payment/order';
      
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();
      
      // Create payment options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        name: isSubscription ? 'Branqly Premium' : 'Branqly',
        description: isSubscription 
          ? 'Auto-renew Monthly Subscription' 
          : 'Premium Subscription',
        handler: async (response) => {
          try {
            const verifyEndpoint = isSubscription
              ? '/api/payment/verify-subscription'
              : '/api/payment/verify';
            
            const verifyRes = await fetch(verifyEndpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            
            const { success } = await verifyRes.json();
            if (success) {
              setUpgraded(true);
              toast.success(isSubscription 
                ? 'Subscription Activated Successfully!' 
                : 'Premium Activated Successfully!');
            } else {
              throw new Error('Verification failed');
            }
          } catch (e) {
            console.error(e);
            setError('Payment verification failed');
            toast.error('Payment verification failed');
          }
        },
        prefill: { email: userEmail },
        theme: { color: '#6366f1' },
      };

      // Add payment-specific fields
      if (isSubscription && data.id) {
        options.subscription_id = data.id;
      } else if (!isSubscription && data.id) {
        options.order_id = data.id;
        options.amount = data.amount;
        options.currency = data.currency;
      }

      // Initialize Razorpay
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Payment processing failed');
      toast.error('Payment processing failed');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <p className="text-lg text-gray-700">Loading your premium status...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Meta 
        title="Branqly Premium | Unlock Advanced Features"
        description="Get access to premium features on Branqly including advanced analytics, custom branding, and more."
      />
      <h1 style={{ display: 'none' }}>Branqly Premium Features</h1>
      <Navbar />
      <main className="flex-grow bg-indigo-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-600">Branqly Premium</h2>
          <p className="mt-4 text-gray-600">Unlock all premium features:</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[FiZap, FiCheck, FiStar, FiShield, FiBarChart2, FiGlobe].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white rounded-xl shadow flex items-center space-x-4"
              >
                <Icon className="text-indigo-600 w-6 h-6" />
                <span className="text-gray-700">
                  {[
                    'Faster Analytics',
                    'Unlimited Links',
                    'Custom Alias',
                    'Enhanced Security',
                    'Advanced Reports',
                    'Global Reach',
                    
                  ][i]}
                </span>
              </motion.div>
            ))}
          </div>

          {!upgraded ? (
            <div className="mt-10 flex flex-col space-y-4">
              <button
                onClick={() => handlePayment(false)}
                disabled={upgrading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                {upgrading ? 'Processing...' : 'Upgrade One‑Time'}
              </button>
             
            </div>
          ) : (
            <p className="mt-8 text-green-600 font-semibold">🎉 You are a Premium User!</p>
          )}

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}











