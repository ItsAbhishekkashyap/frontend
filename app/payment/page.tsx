'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Script from 'next/script';

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_subscription_id: string;
    razorpay_signature: string;
}

interface SubscriptionResponse {
    id: string;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayInstance {
    open(): void;
}

interface RazorpayOptions {
    key: string;
    subscription_id: string;
    name: string;
    description: string;
    handler: (response: RazorpayResponse) => void;
    prefill: {
        name: string;
        email: string;
    };
    theme: {
        color: string;
    };
}

export default function PaymentPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cancelMsg, setCancelMsg] = useState<string | null>(null);

    const userId = '684301f11770f1b405569790'; // ⚠️ Use your real MongoDB User ID

    useEffect(() => {
        const createSubscription = async () => {
            try {
                const res = await axios.post('/api/payment/create-subscription', {
                    userId: userId
                });
                setSubscription(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to create subscription');
            } finally {
                setIsLoading(false);
            }
        };

        createSubscription();
    }, []);

    const openRazorpayCheckout = () => {
        if (!subscription) return;

        const options: RazorpayOptions = {
            key: 'rzp_test_yei6F7Iay80whY', // Replace with your Razorpay Key
            subscription_id: subscription.id,
            name: 'Branqly',
            description: 'Monthly Subscription of ₹199',
            handler: function (response: RazorpayResponse) {
                alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
                window.location.href = '/payment/status';
            },
            prefill: {
                name: 'Test User',
                email: 'test@example.com',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const cancelSubscription = async () => {
        try {
            const res = await axios.post('/api/payment/cancel-subscription', { userId: userId });
            if (res.status === 200) {
                setCancelMsg('Subscription cancelled successfully.');
            } else {
                setCancelMsg(res.data.error || 'Failed to cancel subscription.');
            }
        } catch (err) {
            console.error(err);
            setCancelMsg('Error cancelling subscription.');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl text-gray-700 font-bold mb-4">Subscribe to Plan ₹199/month</h1>
            <button
                className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={openRazorpayCheckout}
            >
                Pay Now
            </button>
            <button
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={cancelSubscription}
            >
                Cancel Subscription
            </button>
            {cancelMsg && <p className="mt-4 text-green-600">{cancelMsg}</p>}
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </div>
    );
}



