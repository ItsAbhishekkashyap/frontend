'use client';

import Link from 'next/link';
import {

  FiMapPin,
  FiMail,
  
} from 'react-icons/fi';
import {
  BsTwitter,
  BsGithub,
  BsLinkedin,
  BsInstagram,
  BsDribbble,
} from 'react-icons/bs';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <div className="relative w-[150px] h-[50px] mb-5 md:mb-1 flex items-center justify-center "> {/* Debug border */}
                <Image
                  src="/logo.png"
                  alt="AshrtL Logo"
                  width={200}
                  height={50}
                  className="object-contain"

                />
              </div>
            </Link>
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
          <div>
            <Link href="/contact" className="text-lg cursor-pointer font-semibold mb-4 text-white  ">
              Contact Us
            </Link>
            <hr className='border-indigo-500 mt-2' />
            <ul className="space-y-4 pt-4">

              {/* Location */}
              <li className="flex items-start">
                <FiMapPin className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-indigo-200">
                  Operated 100% Remotely 🌐 | Crafted with 💙 in India
                </span>
              </li>

              {/* Email */}
              <li className="flex items-start">
                <FiMail className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-indigo-200">
                  Reach us anytime at:
                  <a href="mailto:support@branqly.xyz" className="text-white hover:underline ml-1">
                    support@branqly.xyz
                  </a>
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-start">
                <FiMail className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                <Link href="/contact" className="p-2 cursor-pointer bg-blue-600 text-sm rounded-2xl text-white text-bold">
                Message Us
                </Link>
                
              </li>
            </ul>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm">
            © {new Date().getFullYear()} Branqly. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['privacy-policy', 'terms', 'cookie-policy','refund-policy','about','contact-us','shipping-delivery'].map((item, index) => (
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

