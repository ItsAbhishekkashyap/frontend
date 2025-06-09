import { ReactNode } from "react";

interface StepCardProps {
  number: number;
  title: string;
  description: string; // Add this line
  icon: ReactNode;
  accentColor: string;
}
const StepCard = ({ number, title, description, icon, accentColor } : StepCardProps) => (
  <div className={`h-full p-1 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all`}>
    <div className="bg-white p-6 rounded-xl h-full">
      <div className={`w-14 h-14 ${accentColor} rounded-lg flex items-center justify-center mb-4`}>
        <div className="text-2xl font-bold text-indigo-600">{number}</div>
      </div>
      <div className="text-3xl mb-3 text-indigo-600">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default StepCard;