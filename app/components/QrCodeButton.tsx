'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { FiCopy, FiDownload, FiShare2, FiX } from 'react-icons/fi';

interface QrCodeButtonProps {
  url: string;
  id: string;
}

export default function QrCodeButton({ url, id }: QrCodeButtonProps) {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    const canvas = document.getElementById(`qr-canvas-${id}`) as HTMLCanvasElement;
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `qr-${id}.png`;
    link.click();
  };


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          text: 'Shortened using Branqly - the smart URL shortener.',
          url: 'https://branqly.xyz', // You can make this dynamic
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported in this browser.'); // fallback
    }
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 text-sm bg-green-500 hover:bg-green-700 rounded transition"
      >
        Show QR
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 w-full max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-6 relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <FiX size={24} />
              </button>

              <div className="flex flex-col items-center space-y-6">
                <div className="p-4 bg-white rounded-xl shadow-inner border border-gray-100">
                  <QRCodeCanvas
                    id={`qr-canvas-${id}`}
                    value={url}
                    size={220}
                    includeMargin={true}
                    level="H"
                    fgColor="#1e40af"
                    bgColor="transparent"
                    imageSettings={{
                      src: '/logo-icon.svg', // Add your logo here
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>

                <div className="w-full">
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 flex items-center justify-between">
                    <span className="font-mono text-sm text-gray-700 truncate max-w-[200px]">
                      {url}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-blue-600 cursor-pointer hover:text-blue-800 p-1"
                      aria-label="Copy URL"
                    >
                      <FiCopy size={16} />
                    </button>
                    {copied && (
                      <span className="absolute -top-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex cursor-pointer items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow hover:shadow-md active:scale-95"
                    >
                      <FiDownload size={18} />
                      <span>Download PNG</span>
                    </button>

                    <button onClick={handleShare} className="flex-1 flex cursor-pointer items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-95">
                      <FiShare2 size={18} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}



