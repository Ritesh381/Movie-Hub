import React from "react";

function InfoLoading() {
  return (
    <div className="text-white max-w-7xl mx-auto p-4 md:p-6 bg-gray-900 rounded-lg shadow-lg transition-all">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-64 mx-auto md:mx-0">
          <div className="w-full md:w-64 h-96 bg-gray-800 rounded-lg animate-pulse"></div>
        </div>

        <div className="flex flex-col justify-start flex-grow w-full">
          <div className="flex items-center mb-3">
            <div className="h-8 bg-gray-700 rounded-lg w-3/4 animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-700 rounded-full ml-2 animate-pulse"></div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-700 rounded-lg w-full animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded-lg w-full animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded-lg w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded-lg w-4/6 animate-pulse"></div>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <div className="h-10 bg-gray-700 rounded-full w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded-full w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded-full w-32 animate-pulse"></div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-700 rounded-lg w-full animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded-lg w-5/6 animate-pulse"></div>
          </div>
        </div>
      </div>

      <hr className="m-3 border-gray-800" />
      
      <div className="flex-col ml-5 space-y-3">
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-40 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-48 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-64 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-36 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-32 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-52 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-40 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-36 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-44 animate-pulse"></div>
        </div>
        
        <div className="flex items-center">
          <div className="h-5 bg-gray-700 rounded-lg w-24 animate-pulse"></div>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-6 bg-gray-700 rounded-lg w-48 mb-4 animate-pulse"></div>
        <div className="flex overflow-hidden gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex-shrink-0 w-36">
              <div className="h-52 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded-lg w-full mt-2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded-lg w-2/3 mt-1 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoLoading;