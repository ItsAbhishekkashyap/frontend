'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the TypeScript types for your status data structure
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
}

export default function SubscriptionStatusPage() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1>Subscription Details</h1>
      <p>
        <strong>Premium Since:</strong>{' '}
        {status.premiumSince ? new Date(status.premiumSince).toLocaleDateString() : 'N/A'}
      </p>
      {status.lastPayment ? (
        <>
          <h2>Last Payment</h2>
          <p>Amount: ₹{(status.lastPayment.amount / 100).toFixed(2)}</p>
          <p>Status: {status.lastPayment.status}</p>
          <p>Paid At: {new Date(status.lastPayment.createdAt).toLocaleString()}</p>
        </>
      ) : (
        <p>No payment records found.</p>
      )}
    </div>
  );
}

