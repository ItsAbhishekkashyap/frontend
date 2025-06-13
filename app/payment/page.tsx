"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCreditCard, FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RefundPolicy() {
    const [premium, setPremium] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
    const [activeTab, setActiveTab] = useState('policy');
    const router = useRouter();
    interface Payment {
        id: string;
        amount: number;
        createdAt: string;
        status: string;
    }



    useEffect(() => {
        // Fetch user status and payment history
        const fetchUserData = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                setPremium(data.user?.premium || false);

                if (data.user?.premium) {
                    const payments = await fetch('/api/payment/history');
                    setPaymentHistory(await payments.json());
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleRefundRequest = async (paymentId: string) => {
        try {
            const res = await fetch(`/api/payment/refund`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentId })
            });

            if (res.ok) {
                alert('Refund request submitted successfully!');
                router.refresh();
            } else {
                throw new Error(await res.text());
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(`Refund failed: ${error.message}`);
            } else {
                console.error('Unknown error:', error);
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Header with tabs */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 md:p-8 text-white">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {activeTab === 'policy' ? 'Refund Policy' : 'Your Payments'}
                            </h1>

                            {premium && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveTab('policy')}
                                        className={`px-4 py-2 rounded-lg ${activeTab === 'policy' ? 'bg-white text-blue-600' : 'bg-blue-700 hover:bg-blue-800'}`}
                                    >
                                        Policy
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('payments')}
                                        className={`px-4 py-2 rounded-lg ${activeTab === 'payments' ? 'bg-white text-blue-600' : 'bg-blue-700 hover:bg-blue-800'}`}
                                    >
                                        Your Payments
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 lg:p-10">
                        {activeTab === 'policy' ? (
                            <div className="max-w-3xl mx-auto space-y-10">
                                {/* Existing policy content... */}

                                {!premium && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                                        <h3 className="text-xl font-bold text-blue-800 mb-3">Upgrade to Premium</h3>
                                        <p className="text-blue-700 mb-4">Access payment history and refund management</p>
                                        <Link
                                            href="/pricing"
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <FiDollarSign className="mr-2" />
                                            Upgrade Now
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                    <button
                                        onClick={() => setActiveTab('policy')}
                                        className="mr-4 p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <FiArrowLeft className="text-gray-600" />
                                    </button>
                                    Your Payment History
                                </h2>

                                {paymentHistory.length === 0 ? (
                                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                                        <FiCreditCard className="mx-auto text-4xl text-gray-400 mb-4" />
                                        <p className="text-gray-600">No payment history found</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {paymentHistory.map((payment) => (
                                                    <tr key={payment.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {new Date(payment.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            ${payment.amount / 100}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                    payment.status === 'refunded' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                                {payment.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            {payment.status === 'completed' && (
                                                                <button
                                                                    onClick={() => handleRefundRequest(payment.id)}
                                                                    className="text-red-600 hover:text-red-900 mr-4"
                                                                >
                                                                    Request Refund
                                                                </button>
                                                            )}
                                                            <Link
                                                                href={`/invoice/${payment.id}`}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                View Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}