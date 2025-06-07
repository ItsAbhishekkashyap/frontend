import React from 'react';
import { BsDribbble, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FiLink, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-indigo-900  text-white pt-16 pb-8">
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
                    {[
                      { icon: <BsTwitter className="text-xl" />, label: "Twitter" },
                      { icon: <BsGithub className="text-xl" />, label: "GitHub" },
                      { icon: <BsLinkedin className="text-xl" />, label: "LinkedIn" },
                      { icon: <BsInstagram className="text-xl" />, label: "Instagram" },
                      { icon: <BsDribbble className="text-xl" />, label: "Dribbble" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-indigo-200 hover:text-white transition-colors duration-300 hover:-translate-y-1"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
    
                {/* Product Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Product</h3>
                  <ul className="space-y-3">
                    {['Features', 'Pricing', 'Analytics', 'API', 'Integrations'].map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-indigo-200 hover:text-white transition-colors flex items-center group"
                        >
                          <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
    
                {/* Resources Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Resources</h3>
                  <ul className="space-y-3">
                    {['Documentation', 'Guides', 'Blog', 'Support', 'Status'].map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-indigo-200 hover:text-white transition-colors flex items-center group"
                        >
                          <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
    
                {/* Contact Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white border-b border-indigo-600 pb-2">Contact Us</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FiMapPin className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-indigo-200">123 Link Street, San Francisco, CA 94107</span>
                    </li>
                    <li className="flex items-start">
                      <FiMail className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                      <a href="mailto:hello@shortlink.com" className="text-indigo-200 hover:text-white transition-colors">
                        hello@shortlink.com
                      </a>
                    </li>
                    <li className="flex items-start">
                      <FiPhone className="text-indigo-300 mt-1 mr-3 flex-shrink-0" />
                      <a href="tel:+11234567890" className="text-indigo-200 hover:text-white transition-colors">
                        +1 (123) 456-7890
                      </a>
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
                  {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-indigo-300 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
  );
}

export default Footer;
