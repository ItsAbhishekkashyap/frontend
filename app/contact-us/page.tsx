"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiClock } from "react-icons/fi";
import {  FaPaperPlane, FaGlobe } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Meta from '@/components/Meta';



export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
             <Meta 
        title="Contact Branqly | Get in Touch"
        description="Contact Branqly for any queries, support, or partnership opportunities."
      />
      <h1 style={{ display: 'none' }}>Contact Branqly Support Team</h1>
            
            <Navbar />
            <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-12 lg:mb-20">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-6"
                            >
                                <div className="bg-indigo-100 p-4 rounded-full">
                                    <FaPaperPlane className="text-indigo-600 text-3xl" />
                                </div>
                            </motion.div>
                            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
                                Let&#39;s Connect
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Have questions or feedback? We&#39;d love to hear from you. Our team is ready to help!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6"
                            >
                                {/* Company Info */}
                                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <FaGlobe className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">About Branqly</h3>
                                            <p className="text-gray-600">
                                                Premium SaaS platform for effortless link shortening, branding & analytics. Simplify your URLs, amplify your brand.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Email */}
                                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <FiMail className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Contact Email</h3>
                                            <p className="text-gray-600">support@branqly.xyz</p>
                                            <p className="text-gray-600 mt-1">We respond within 24 hours.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <FiClock className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">Business Hours</h3>
                                            <p className="text-gray-600">Mon-Sat: 9:00 AM - 6:00 PM IST</p>
                                            <p className="text-gray-600 mt-1">Feel free to drop us a message anytime!</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Live Chat CTA */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-2xl shadow-lg text-white"
                                >
                                    <h3 className="text-xl font-bold mb-3">Need help?</h3>
                                    <p className="mb-4">We are working on integrating Live Chat soon. Stay tuned!</p>
                                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                                        Contact Us
                                    </button>
                                </motion.div>
                            </motion.div>


                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="lg:col-span-2"
                            >
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden h-full"
                                >
                                    <div className="p-8 sm:p-10">
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
                                            <p className="text-gray-600">Fill out the form below and we&#39;ll get back to you as soon as possible.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-1">
                                                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                                                    <FiUser className="mr-2 text-indigo-600" />
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                                                    <FiMail className="mr-2 text-indigo-600" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="your@email.com"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700">
                                                    <FiMessageSquare className="mr-2 text-indigo-600" />
                                                    Your Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    rows={5}
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                                    placeholder="How can we help you?"
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={loading}
                                                whileTap={{ scale: 0.98 }}
                                                className={`w-full flex justify-center items-center py-4 px-6 rounded-xl font-medium text-white transition ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                            >
                                                {loading ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiSend className="mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </motion.button>

                                            {status && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`p-4 rounded-lg ${status === "success" ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
                                                >
                                                    {status === "success" ? (
                                                        <p className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            Message sent successfully! We&#39;ll get back to you soon.
                                                        </p>
                                                    ) : (
                                                        <p className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                            </svg>
                                                            Something went wrong. Please try again later.
                                                        </p>
                                                    )}
                                                </motion.div>
                                            )}
                                        </form>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

