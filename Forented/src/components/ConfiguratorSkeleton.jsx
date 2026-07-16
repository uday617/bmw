import React from "react";

export default function ConfiguratorSkeleton() {
  return (
    <div className="min-h-screen bg-white relative z-50">
      <div className="h-20 border-b border-gray-100 flex items-center px-10">
         <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="pt-24 px-10 max-w-7xl mx-auto animate-pulse">
        <div className="w-64 h-10 bg-gray-200 rounded mb-8" />
        <div className="flex justify-between mb-10">
           <div className="w-32 h-10 bg-gray-100 border border-gray-200 rounded" />
           <div className="w-48 h-10 bg-gray-100 border border-gray-200 rounded" />
        </div>
        
        {/* Car Section Skeletons */}
        {[1, 2].map((section) => (
          <div key={section} className="mb-12">
            <div className="w-48 h-8 bg-gray-200 rounded mb-6" />
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4].map((car) => (
                <div key={car} className="w-64 shrink-0 bg-gray-50 border border-gray-100 p-4 rounded h-72">
                  <div className="w-full h-32 bg-gray-200 rounded mb-4" />
                  <div className="w-24 h-4 bg-gray-200 rounded mb-2" />
                  <div className="w-32 h-4 bg-gray-100 rounded mb-6" />
                  <div className="w-16 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
