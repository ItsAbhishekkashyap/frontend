import { motion } from 'framer-motion';
import { JSX, ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode; // Add this type annotation
  title: string;
  description: string;
  badge: string;
}
export default function FeatureCard ({ icon, title, description, badge }: FeatureCardProps): JSX.Element {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-indigo-600 text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {badge && <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{badge}</span>}
    </motion.div>
  );
};

