"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";

import Image from "next/image"; // Important for optimized images
import Meta from '@/components/Meta';

interface Post {
  title: string;
  excerpt: string;
  date?: string;
  readTime?: string;
  category: string;
  image?: string;
  link?: string;
  alias?: string;
  tags?: string[];
}

export default function BlogPage() {
  const featuredPosts: Post[] = [
    {
      title: "The Future of URL Shortening",
      excerpt: "Discover how AI is revolutionizing link management and what it means for marketers.",
      category: "Technology",
      image: "/images/future-url.svg",
      alias: "the-future-of-url-shortening",
      tags: ["AI", "Innovation", "Marketing"],
    },
    {
      title: "Maximizing Clicks with Branqly",
      excerpt: "Learn advanced strategies to optimize your shortened URLs for maximum engagement.",
      category: "Marketing",
      image: "/images/max-clicks.svg",
      alias: "maximizing-clicks-with-smart-links",
      tags: ["CTR", "Optimization", "Analytics"],
    },
  ];

  const recentPosts: Post[] = [
    {
      title: "Building a Scalable Link Shortener",
      excerpt: "Technical deep dive into our architecture decisions for handling millions of daily clicks.",
      category: "Engineering",
      image: "/images/scalable.svg",
      alias: "building-scalable-link-shortener",
      tags: ["Architecture", "Scalability", "Tech"],
    },
    {
      title: "Privacy-First Analytics",
      excerpt: "How we provide powerful insights while respecting user privacy.",
      category: "Security",
      image: "/images/privacy.svg",
      alias: "privacy-first-analytics",
      tags: ["GDPR", "Privacy", "Data"],
    },
    {
      title: "Why Branded Links Matter",
      excerpt: "The psychology behind custom domains and how they affect click-through rates.",
      category: "Branding",
      image: "/images/branded.svg",
      alias: "why-branded-links-matter",
      tags: ["Branding", "Psychology", "CTR"],
    },
  ];

  return (
    <>
      <Meta 
        title="Branqly Blog | Tips on Link Management & Marketing"
        description="Read helpful blogs about link shortening, marketing, and maximizing the power of branded links."
      />
      <h1 style={{ display: 'none' }}>Branqly Blog - Latest Updates</h1>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Navbar />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-24">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Branqly Blog</h1>
                <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                  Insights, stories and expertise about link management, digital marketing and web technology
                </p>
              </motion.div>
            </div>
          </section>

          {/* Featured Posts */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
            >
              <span className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></span>
              Featured Stories
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="h-56 relative overflow-hidden">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    <div className="absolute inset-0  bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <div className="relative z-20 text-center  p-4">
                      <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full mb-3 border border-white/30">
                        {post.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{post.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/blog/${post.alias}`}
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                      >
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                      <div className="flex gap-2">
                        {post.tags?.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Recent Posts */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
            >
              <span className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></span>
              Latest Articles
            </motion.h2>

            <div className="space-y-8">
              {recentPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/blog/${post.alias}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors text-sm"
                        >
                          Read full article →
                        </Link>
                      </div>
                    </div>
                    <div className="md:w-1/3 md:pl-6">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-40"
                        />
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

