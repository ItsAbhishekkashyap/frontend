'use client';

import Link from 'next/link';
import {
  FiLink,
  FiMapPin,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import {
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsInstagram,
  BsDribbble,
} from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiLink className="text-indigo-300 text-2xl" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                ShortLink
              </h2>
            </div>
            <p className="text-indigo-200 max-w-xs">
              Transform long URLs into short, powerful links that drive engagement and track performance.
            </p>
            <div className="flex space-x-4 pt-2">
              {[BsTwitter, BsGithub, BsLinkedin, BsInstagram, BsDribbble].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-indigo-200 hover:text-white transition-colors duration-300 hover:-translate-y-1"
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Product</h3>
            <ul className="space-y-3">
              {['features', 'pricing', 'dashboard'].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item}`}
                    className="text-indigo-200 hover:text-white transition-colors flex items-center group capitalize"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 group-hover:bg-white transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Resources</h3>
            <ul className="space-y-3">
              {['documentation', 'guides', 'blog'].map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item}`}
                    className="text-indigo-200 hover:text-white transition-colors flex items-center group capitalize"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 group-hover:bg-white transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-indigo-200">
                  Operated remotely 🌐 — Built with 💙 in India
                </span>
              </li>
              <li className="flex items-start">
                <FiMail className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-indigo-200">
                  Contact option coming soon...
                </span>
              </li>
              <li className="flex items-start">
                <FiPhone className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-indigo-200">
                  Support available after official launch 🚀
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm">
            © {new Date().getFullYear()} ShortLink. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['privacy-policy', 'terms', 'cookie-policy'].map((item, index) => (
              <Link
                key={index}
                href={`/${item}`}
                className="text-indigo-300 hover:text-white text-sm transition-colors capitalize"
              >
                {item.replace('-', ' ')}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

