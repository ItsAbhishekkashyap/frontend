// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// // TypeScript types
// type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// interface LastPayment {
//   amount: number;
//   status: PaymentStatus;
//   createdAt: string; // ISO date string from backend
// }

// interface SubscriptionStatus {
//   premium: boolean;
//   premiumSince?: string; // ISO date string or undefined
//   lastPayment?: LastPayment;
//   userId: string;
// }

// export default function SubscriptionStatusPage() {
//   const [status, setStatus] = useState<SubscriptionStatus | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [cancelMsg, setCancelMsg] = useState<string | null>(null);
//   const [cancelLoading, setCancelLoading] = useState(false);

  

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const res = await axios.get('/api/payment/status');
//         setStatus(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStatus();
//   }, []);

//   if (loading) return <p>Loading subscription status...</p>;

//   if (!status?.premium) return <p>You are not a premium user.</p>;

//   // Calculate expiration date (assuming 1 month from last payment)
//   const lastPaymentDate = status.lastPayment ? new Date(status.lastPayment.createdAt) : null;
//   const expirationDate = lastPaymentDate ? new Date(lastPaymentDate) : null;
//   if (expirationDate) expirationDate.setMonth(expirationDate.getMonth() + 1);

//   // Check if cancel is allowed within 7 days of payment
//   const now = new Date();
//   const canCancel =
//     lastPaymentDate &&
//     (now.getTime() - lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;

//   // Handlers
// const handleCancelSubscription = async () => {
//   if (!status || !status.userId) {
//     setCancelMsg('Subscription status or user ID not loaded.');
//     return;
//   }

//   setCancelLoading(true);
//   setCancelMsg(null);

//   try {
//     const res = await axios.post('/api/payment/cancel-subscription', {
//       userId: status.userId, // Pass userId from status response
//     });

//     if (res.status === 200) {
//       setCancelMsg('Subscription cancelled successfully.');
//       // Refetch updated subscription status to refresh UI
//       const refreshed = await axios.get('/api/payment/status');
//       setStatus(refreshed.data);
//     } else {
//       setCancelMsg(res.data?.error || 'Failed to cancel subscription.');
//     }
//   } catch (err) {
//     console.error('Cancel subscription error:', err);
//     setCancelMsg('Error cancelling subscription.');
//   } finally {
//     setCancelLoading(false);
//   }
// };


//   return (
//     <div className='w-screen'>
//     <Navbar/>
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Subscription Details</h1>
//       <p>
//         <strong>Premium Since:</strong>{' '}
//         {status.premiumSince ? new Date(status.premiumSince).toLocaleDateString() : 'N/A'}
//       </p>
//       {status.lastPayment ? (
//         <>
//           <h2 className="mt-4 text-xl font-semibold">Last Payment</h2>
//           <p>Amount: ₹{((status.lastPayment.amount)/100).toFixed(2)}</p>
//           <p>Status: {status.lastPayment.status}</p>
//           <p>Paid At: {new Date(status.lastPayment.createdAt).toLocaleString()}</p>

//           <p className="mt-4">
//             <strong>Expiration Date:</strong>{' '}
//             {expirationDate ? expirationDate.toLocaleDateString() : 'N/A'}
//           </p>

//           <div className="mt-6 flex flex-col gap-3">
//             <button
//               onClick={handleCancelSubscription}
//               disabled={!canCancel || cancelLoading}
//               className={`px-4 py-2 rounded text-white ${
//                 canCancel && !cancelLoading ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
//               }`}
//             >
//               {cancelLoading ? 'Cancelling...' : 'Cancel Subscription'}
//             </button>

//             {!canCancel && (
//               <p className="text-sm text-gray-600">
//                 Cancellation is available only within 7 days of payment.
//               </p>
//             )}

//             <button
//               onClick={() => alert('Renewal flow not implemented yet')}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
//             >
//               Renew Subscription
//             </button>
//           </div>
//         </>
//       ) : (
//         <p>No payment records found.</p>
//       )}
//      {cancelMsg && (
//   <p className={`mt-4 ${cancelMsg.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
//     {cancelMsg}
//   </p>
// )}
//     </div>
//       <Footer/>
//     </div>
//   );
// }











'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, CheckCircle, XCircle, RefreshCw, Zap, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import Link from 'next/link';

type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

interface LastPayment {
  amount: number;
  status: PaymentStatus;
  createdAt: string;
}

interface SubscriptionStatus {
  premium: boolean;
  premiumSince?: string;
  lastPayment?: LastPayment;
  userId: string;
}

export default function SubscriptionStatusPage() {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelMsg, setCancelMsg] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

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

  // Expiration Calculation
  const lastPaymentDate = status?.lastPayment ? new Date(status.lastPayment.createdAt) : null;
  const expirationDate = lastPaymentDate ? new Date(lastPaymentDate) : null;
  if (expirationDate) expirationDate.setMonth(expirationDate.getMonth() + 1);

  const now = new Date();
  const isExpired = expirationDate ? now > expirationDate : false;
  const canCancel = lastPaymentDate && 
    (now.getTime() - lastPaymentDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;

  const handleCancelSubscription = async () => {
  if (!status || !status.userId) {
    setCancelMsg('User ID not loaded.');
    return;
  }

  setCancelLoading(true);
  setCancelMsg(null);

  try {
    const res = await axios.post('/api/payment/refund-and-cancel', { 
      userId: status.userId,
    });

    if (res.status === 200) {
      setCancelMsg('Refund and subscription cancellation successful.');
      const refreshed = await axios.get('/api/payment/status');
      setStatus(refreshed.data);
    } else {
      setCancelMsg(res.data?.error || 'Failed to refund and cancel subscription.');
    }
  } catch (err) {
    console.error('Refund and cancel subscription error:', err);
    setCancelMsg('Error processing refund and cancellation.');
  } finally {
    setCancelLoading(false);
    setShowCancelConfirm(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-indigo-600" />
            <p className="mt-4 text-lg font-medium text-gray-600">Loading your subscription details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!status) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Subscription</h2>
            <p className="text-gray-600 mb-6">Failed to load your subscription details.</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Subscription Details</h1>
                <p className="mt-1 text-blue-100">Manage your premium membership</p>
              </div>
              <div className={`rounded-full px-3 py-1 text-sm font-medium ${
                status.premium ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'
              }`}>
                {status.premium ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Membership Info */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Membership Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Premium Status</h3>
                      <p className={`text-sm font-semibold ${
                        status.premium ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {status.premium ? 'Active' : 'Not Active'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                      <p className="text-sm font-semibold text-gray-900">
                        {status.premiumSince ? new Date(status.premiumSince).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            {status.lastPayment ? (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                      <p className="mt-1 text-xl font-semibold text-gray-900">
                        ₹{((status.lastPayment.amount) / 100).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          status.lastPayment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          status.lastPayment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {status.lastPayment.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 mr-1" />
                          ) : status.lastPayment.status === 'pending' ? (
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-1" />
                          )}
                          <span className="capitalize">{status.lastPayment.status}</span>
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Paid At</h3>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {new Date(status.lastPayment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Expiration Date</h3>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {expirationDate ? expirationDate.toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
                <CreditCard className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No payment records found</p>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription Actions</h2>
              <div className="space-y-4">
                {!showCancelConfirm ? (
                  <>
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      disabled={!canCancel || cancelLoading}
                      className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        canCancel && !cancelLoading ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                    >
                      {cancelLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Cancelling...
                        </>
                      ) : (
                        'Cancel Subscription'
                      )}
                    </button>

                    {!canCancel && !isExpired && (
                      <div className="flex items-start text-sm text-gray-600">
                        <AlertCircle className="flex-shrink-0 h-4 w-4 text-yellow-500 mt-0.5 mr-1.5" />
                        <p>Cancellation is only available within 7 days of payment.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Confirm Cancellation</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Are you sure you want to cancel your subscription?</p>
                        </div>
                        <div className="mt-4">
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              onClick={handleCancelSubscription}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Yes, Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowCancelConfirm(false)}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              No, Go Back
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isExpired && (
                  <Link
                    href="/payment"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renew Subscription
                  </Link>
                )}
              </div>
            </div>

            {/* Status Messages */}
            {cancelMsg && (
              <div className={`mt-6 p-4 rounded-md ${
                cancelMsg.includes('success') ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {cancelMsg.includes('success') ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      cancelMsg.includes('success') ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {cancelMsg}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}