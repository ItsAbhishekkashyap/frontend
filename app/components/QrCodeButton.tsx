'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { FiDownload, FiX } from 'react-icons/fi';

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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-lg p-6 relative shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            <div className="flex flex-col items-center space-y-4">
              <QRCodeCanvas
                id={`qr-canvas-${id}`}
                value={url}
                size={200}
                includeMargin={true}
              />

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <FiDownload /> Download QR
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}


