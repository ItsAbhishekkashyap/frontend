'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// TypeScript types
type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

interface LastPayment {
  amount: number;
  status: PaymentStatus;
  createdAt: string; // ISO date string from backend
}

interface SubscriptionStatus {
  premium: boolean;
  premiumSince?: string; // ISO date string or undefined
  lastPayment?: LastPayment;
  userId: string;
}

export default function SubscriptionStatusPage() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelMsg, setCancelMsg] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('/api/payment/status');
        setStatus(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) return <p>Loading subscription status...</p>;

  if (!status?.premium) return <p>You are not a premium user.</p>;

  // Calculate expiration date (assuming 1 month from last payment)
  const lastPaymentDate = status.lastPayment ? new Date(status.lastPayment.createdAt) : null;
  const expirationDate = lastPaymentDate ? new Date(lastPaymentDate) : null;
  if (expirationDate) expirationDate.setMonth(expirationDate.getMonth() + 1);

  // Check if cancel is allowed within 7 days of payment
  const now = new Date();
  const canCancel =
    lastPaymentDate &&
    (now.getTime() - lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;

  // Handlers
const handleCancelSubscription = async () => {
  if (!status || !status.userId) {
    setCancelMsg('Subscription status or user ID not loaded.');
    return;
  }

  setCancelLoading(true);
  setCancelMsg(null);

  try {
    const res = await axios.post('/api/payment/cancel-subscription', {
      userId: status.userId, // Pass userId from status response
    });

    if (res.status === 200) {
      setCancelMsg('Subscription cancelled successfully.');
      // Refetch updated subscription status to refresh UI
      const refreshed = await axios.get('/api/payment/status');
      setStatus(refreshed.data);
    } else {
      setCancelMsg(res.data?.error || 'Failed to cancel subscription.');
    }
  } catch (err) {
    console.error('Cancel subscription error:', err);
    setCancelMsg('Error cancelling subscription.');
  } finally {
    setCancelLoading(false);
  }
};


  return (
    <div className='w-screen'>
    <Navbar/>
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subscription Details</h1>
      <p>
        <strong>Premium Since:</strong>{' '}
        {status.premiumSince ? new Date(status.premiumSince).toLocaleDateString() : 'N/A'}
      </p>
      {status.lastPayment ? (
        <>
          <h2 className="mt-4 text-xl font-semibold">Last Payment</h2>
          <p>Amount: ₹{((status.lastPayment.amount)/100).toFixed(2)}</p>
          <p>Status: {status.lastPayment.status}</p>
          <p>Paid At: {new Date(status.lastPayment.createdAt).toLocaleString()}</p>

          <p className="mt-4">
            <strong>Expiration Date:</strong>{' '}
            {expirationDate ? expirationDate.toLocaleDateString() : 'N/A'}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleCancelSubscription}
              disabled={!canCancel || cancelLoading}
              className={`px-4 py-2 rounded text-white ${
                canCancel && !cancelLoading ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {cancelLoading ? 'Cancelling...' : 'Cancel Subscription'}
            </button>

            {!canCancel && (
              <p className="text-sm text-gray-600">
                Cancellation is available only within 7 days of payment.
              </p>
            )}

            <button
              onClick={() => alert('Renewal flow not implemented yet')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Renew Subscription
            </button>
          </div>
        </>
      ) : (
        <p>No payment records found.</p>
      )}
      {cancelMsg && <p className="mt-4 text-green-600">{cancelMsg}</p>}
    </div>
      <Footer/>
    </div>
  );
}


