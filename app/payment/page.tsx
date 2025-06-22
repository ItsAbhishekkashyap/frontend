// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Script from 'next/script';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface RazorpayResponse {
//   razorpay_payment_id: string;
//   razorpay_subscription_id: string;
//   razorpay_signature: string;
// }

// interface SubscriptionResponse {
//   id: string;
// }

// interface User {
//   userId: string;
//   name: string;
//   email: string;
// }

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
//   }
// }

// interface RazorpayInstance {
//   open(): void;
// }

// interface RazorpayOptions {
//   key: string;
//   subscription_id: string;
//   name: string;
//   description: string;
//   handler: (response: RazorpayResponse) => void;
//   prefill: {
//     name: string;
//     email: string;
//   };
//   theme: {
//     color: string;
//   };
// }

// export default function PaymentPage() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUserAndCreateSubscription = async () => {
//       try {
//         // 1. Fetch logged-in user dynamically
//         const userRes = await axios.get('/api/auth/me');
//         const { user } = userRes.data;

//         if (!user || !user.userId || !user.email) {
//           throw new Error('User data missing from API');
//         }

//         setUser(user);

//         // 2. Create Razorpay subscription for this user
//         const subRes = await axios.post('/api/payment/create-subscription', {
//           userId: user.userId,
//           email: user.email,
//         });

//         setSubscription(subRes.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch user or create subscription');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserAndCreateSubscription();
//   }, []);

//   const openRazorpayCheckout = () => {
//     if (!subscription || !user) return;

//     const options: RazorpayOptions = {
//       key: 'rzp_test_yei6F7Iay80whY', // Use your Razorpay Key
//       subscription_id: subscription.id,
//       name: 'Branqly',
//       description: 'Monthly Subscription of ₹199',
//       handler: async function (response: RazorpayResponse) {
//         try {
//           const verifyRes = await axios.post('/api/payment/verify', {
//             subscriptionId: response.razorpay_subscription_id,
//             paymentId: response.razorpay_payment_id,
//             signature: response.razorpay_signature,
//             userId: user.userId,
//           });

//           if (verifyRes.data.success) {
//             alert('Payment Verified and Successful!');
//             window.location.href = '/payment/status';
//           } else {
//             alert('Payment verification failed.');
//           }
//         } catch (err) {
//           alert('Error verifying payment.');
//           console.error(err);
//         }
//       },
//       prefill: {
//         name: user.name,
//         email: user.email,
//       },
//       theme: {
//         color: '#3399cc',
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="">
//       <Navbar/>
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-2xl text-gray-700 font-bold mb-4">Subscribe to Plan ₹199/month</h1>
//       <button
//         className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         onClick={openRazorpayCheckout}
//         disabled={!subscription || !user}
//       >
//         Pay Now
//       </button>
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />
//     </div>
//     <Footer/>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

import Meta from '@/components/Meta';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

interface SubscriptionResponse {
  id: string;
}

interface User {
  userId: string;
  name: string;
  email: string;
  premium: boolean;  // Correct key here (not isPremium)
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
  const [user, setUser] = useState<User | null>(null);
  const [payLoading, setPayLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndCreateSubscription = async () => {
      try {
        const userRes = await axios.get('/api/auth/me');
        const { user } = userRes.data;

        if (!user || !user.userId || !user.email) {
          throw new Error('User data missing');
        }

        setUser(user);

        // Create Razorpay subscription if not premium
        if (!user.premium) {
          const subRes = await axios.post('/api/payment/create-subscription', {
            userId: user.userId,
            email: user.email,
          });
          setSubscription(subRes.data);
        }

        // Show confetti for premium users
        if (user.premium) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
        }

      } catch (err) {
        console.error(err);
        setError('Failed to load user or create subscription refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndCreateSubscription();
  }, []);

  const openRazorpayCheckout = () => {
    if (!subscription || !user) return;

    setPayLoading(true);

    const options: RazorpayOptions = {
      key: 'rzp_live_zz6kmIzjG8kElZ',
      subscription_id: subscription.id,
      name: 'Branqly',
      description: 'Monthly Subscription of ₹199',
      handler: async function (response: RazorpayResponse) {
        try {
          const verifyRes = await axios.post('/api/payment/verify', {
            subscriptionId: response.razorpay_subscription_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            userId: user.userId,
          });

          if (verifyRes.data.success) {
            alert('Payment Verified Successfully!');
            window.location.href = '/payment/status';
          } else {
            alert('Payment verification failed.');
          }
        } catch (err) {
          alert('Verification error.');
          console.error(err);
        } finally {
          setPayLoading(false);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#6366F1',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-200">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  // Premium User View (Creative)
  if (user?.premium) {
    return (
      <div className="w-screen min-h-screen bg-gradient-to-r from-green-100 to-teal-200">
        <Navbar />
        <div className="flex flex-col w-screen items-center justify-center px-4 py-12 space-y-8">
          <h1 className="text-3xl font-bold text-green-800 text-center">🎉 You&#39;re a Premium User!</h1>
          <p className="text-gray-700 text-center max-w-sm">
            Enjoy unlimited access, priority support, and all the latest updates.
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-sm">
            <div className="bg-gray-300 h-3 rounded-full overflow-hidden">
              <div className="bg-green-500 h-3 w-full animate-pulse"></div>
            </div>
            <p className="text-center text-green-700 font-semibold mt-2">Premium Active</p>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Non-Premium User View
return (
  <div className="w-screen min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200">
    <Meta 
        title="Secure Payment Portal | Branqly"
        description="Complete your payment securely through Branqly's trusted payment portal."
      />
      <h1 style={{ display: 'none' }}>Branqly Payment Portal</h1>
    <Navbar />
    <div className="flex flex-col items-center justify-center px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-indigo-700 text-center">Get Premium Access</h1>
      <p className="text-gray-600 text-center max-w-sm">
        Unlock all premium features including unlimited usage and priority support for just ₹199/month.
      </p>

      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">₹199 / month</h2>

        <ul className="space-y-2">
          <li className="flex items-center text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5 mr-2" /> Unlimited Access
          </li>
          <li className="flex items-center text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5 mr-2" /> Priority Support
          </li>
          <li className="flex items-center text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5 mr-2" /> Monthly Updates
          </li>
        </ul>

        <button
          onClick={openRazorpayCheckout}
          disabled={!subscription || !user || payLoading}
          className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex justify-center items-center"
        >
          {payLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...
            </>
          ) : (
            'Pay ₹199 Now'
          )}
        </button>
      </div>

      {/* Light Note for International Users */}
      <p className="mt-4 text-sm text-gray-500 text-center max-w-xs">
        Note: Refunds are <span className="font-medium text-gray-700">not available for international payments</span> made via PayPal or other global methods.
      </p>
    </div>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    <Footer />
  </div>
);

}
