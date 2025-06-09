import { ReactNode } from "react";


const Step = ({ number, title, description, icon, isLast }: { number: number, title: string, description: string, icon: ReactNode, isLast: boolean }) => {
  return (
    <div className="flex relative pb-12">
      <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center z-10">
        {number}
      </div>
      <div className="flex-grow pl-6">
        {!isLast && (
          <div className="absolute top-5 left-5 h-full w-0.5 bg-indigo-200"></div>
        )}
        <div className="text-indigo-600 text-xl mb-2">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

// Usage in timeline

export default Step;