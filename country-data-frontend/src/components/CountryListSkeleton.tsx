import React from 'react';

const CountryListSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 animate-pulse">
      <div className="h-32 bg-gray-300 rounded-t-lg"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default CountryListSkeleton;