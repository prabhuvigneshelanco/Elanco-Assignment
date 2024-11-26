import React from 'react';

const CountryCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-48 bg-gray-300 rounded-lg mb-6"></div>

      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CountryCardSkeleton;