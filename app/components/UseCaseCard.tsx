import { motion } from 'framer-motion';
import { JSX } from 'react';
interface UseCaseCardProps {
  title: string;
  description: string;
  visual: JSX.Element;
  color: string;
}
const UseCaseCard = ({ title, description, visual, color }: UseCaseCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="mb-4 h-40 flex items-center justify-center">
          {visual}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-600">{color}</p>
        

        
      </div>
    </motion.div>
  );
};

// Simple SVG components
const SocialMediaVisual = () => (
  <svg className="w-32 h-32" viewBox="0 0 100 100">
    <circle cx="30" cy="30" r="10" fill="#4F46E5" />
    <circle cx="70" cy="30" r="10" fill="#4F46E5" />
    <circle cx="50" cy="70" r="10" fill="#4F46E5" />
    <path d="M30 30L50 70L70 30" stroke="#4F46E5" strokeWidth="2" fill="none" />
  </svg>
);

const EmailVisual = () => (
  <svg 
    className="w-32 h-32 text-indigo-600" 
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Envelope */}
    <path 
      d="M10 30L50 55L90 30V70C90 73.3137 87.3137 76 84 76H16C12.6863 76 10 73.3137 10 70V30Z" 
      stroke="currentColor" 
      strokeWidth="4"
      fill="#EEF2FF"
    />
    
    {/* Envelope flap */}
    <path 
      d="M10 30L50 55L90 30L50 5L10 30Z" 
      stroke="currentColor" 
      strokeWidth="4"
      fill="#E0E7FF"
    />
    
    {/* Link symbol inside */}
    <g transform="translate(35 40)" stroke="currentColor" strokeWidth="2">
      <path d="M12 10H24C26.2091 10 28 11.7909 28 14V22C28 24.2091 26.2091 26 24 26H12C9.79086 26 8 24.2091 8 22V14C8 11.7909 9.79086 10 12 10Z" />
      <path d="M18 18L22 18" strokeLinecap="round" />
      <path d="M14 18L16 18" strokeLinecap="round" />
      <path d="M14 14L14 22" />
    </g>
  </svg>
);

const QRCodeVisual = () => (
  <svg 
    className="w-32 h-32 text-indigo-600"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* QR Code Border */}
    <rect 
      x="20" 
      y="20" 
      width="60" 
      height="60" 
      rx="5" 
      stroke="currentColor" 
      strokeWidth="4"
      fill="#EEF2FF"
    />
    
    {/* QR Code Patterns */}
    {/* Top-left corner */}
    <rect x="25" y="25" width="15" height="15" fill="currentColor" />
    <rect x="25" y="40" width="5" height="5" fill="currentColor" />
    <rect x="35" y="25" width="5" height="5" fill="currentColor" />
    
    {/* Top-right corner */}
    <rect x="60" y="25" width="15" height="15" fill="currentColor" />
    <rect x="70" y="25" width="5" height="5" fill="currentColor" />
    <rect x="60" y="35" width="5" height="5" fill="currentColor" />
    
    {/* Bottom-left corner */}
    <rect x="25" y="60" width="15" height="15" fill="currentColor" />
    <rect x="35" y="60" width="5" height="5" fill="currentColor" />
    <rect x="25" y="70" width="5" height="5" fill="currentColor" />
    
    {/* Center link symbol */}
    <g transform="translate(42 42)" fill="currentColor">
      <path d="M8 0H12V4H8V0Z" />
      <path d="M0 8H4V12H0V8Z" />
      <path d="M12 8H16V12H12V8Z" />
      <path d="M8 12H12V16H8V12Z" />
      <path d="M4 4H8V8H4V4Z" />
    </g>
    
    {/* Connection patterns */}
    <rect x="45" y="25" width="2" height="10" fill="currentColor" />
    <rect x="25" y="45" width="10" height="2" fill="currentColor" />
    <rect x="50" y="60" width="5" height="2" fill="currentColor" />
    <rect x="65" y="45" width="2" height="5" fill="currentColor" />
  </svg>
);



export { UseCaseCard, SocialMediaVisual, EmailVisual, QRCodeVisual };