'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

import Footer from '@/components/Footer';
import Navbar from '@/components/loginNavbar';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Logged in successfully!');
        router.push('/payment');
      } else {
        toast.error(result.error || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = '/api/auth/google';
  // };

  return (
    <div className="">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              <p className="text-indigo-100 mt-1">Sign in to your account</p>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-600" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      aria-label="Email Address"
                      {...register('email')}
                      className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                        } text-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      aria-label="Password"
                      {...register('password')}
                      className={`w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                        } text-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2 text-gray-500"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => router.push('/forgot-password')}
                    className="text-sm cursor-pointer text-indigo-600 hover:text-indigo-800 hover:underline transition"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-indigo-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <FiArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition mt-4"
              >
                Sign in with Google
              </button>  */}

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => router.push('/signup')}
                    className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline transition"
                  >
                    Sign up <FiUserPlus className="inline ml-1" />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

