// client/src/components/LoadingSpinner.jsx
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-12 h-12 rounded-full border-4 border-primary-200 animate-spin">
        </div>
        {/* Inner circle - creates the spinner effect */}
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-primary-600 
                      border-t-transparent animate-spin">
        </div>
      </div>
      <span className="ml-3 text-gray-600 text-lg">Loading...</span>
    </div>
  );
}