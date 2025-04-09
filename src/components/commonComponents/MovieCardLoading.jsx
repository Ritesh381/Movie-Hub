import React from 'react';

const MovieCardLoading = ({ width = "40", height = "48" }) => {
  return (
    <div
      className={`relative flex-shrink-0 w-${width} sm:w-48 md:w-56 h-${height} sm:h-72 md:h-80 
      rounded-lg overflow-hidden shadow-lg animate-pulse`}
    >
      {/* Placeholder for image */}
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
        <span className="sr-only">Loading movie image</span>
      </div>

      {/* Title placeholder */}
      <div className="absolute bottom-0 w-full bg-gray-400 dark:bg-gray-600 h-8 sm:h-10">
        <div className="w-3/4 h-4 mx-auto mt-2 bg-gray-300 dark:bg-gray-500 rounded"></div>
      </div>

      {/* Rating and buttons placeholder */}
      <div className="absolute top-2 right-2 flex gap-2 space-x-1">
        <div className="bg-gray-400 dark:bg-gray-600 p-1 sm:p-2 rounded-full h-6 w-12 sm:h-8 sm:w-16"></div>
        <div className="bg-gray-400 dark:bg-gray-600 p-1 sm:p-2 rounded-full h-6 w-6 sm:h-8 sm:w-8"></div>
        <div className="bg-gray-400 dark:bg-gray-600 p-1 sm:p-2 rounded-full h-6 w-6 sm:h-8 sm:w-8"></div>
      </div>
    </div>
  );
};

export default MovieCardLoading;