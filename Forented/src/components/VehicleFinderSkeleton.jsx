import React from "react";

export default function VehicleFinderSkeleton() {
  return (
    <div className="min-h-screen bg-white relative z-50">
      <div className="h-20 border-b border-gray-100 flex items-center px-10">
         <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="pt-24 px-10 max-w-7xl mx-auto animate-pulse">
        <div className="w-80 h-10 bg-gray-200 rounded mb-6" />
        <div className="w-full h-[1px] bg-gray-200 mb-6" />

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <div className="w-32 h-10 bg-gray-800 rounded" />
          <div className="w-24 h-10 bg-gray-100 rounded" />
          <div className="w-24 h-10 bg-gray-100 rounded" />
          <div className="w-32 h-10 bg-gray-100 rounded" />
        </div>

        <div className="w-full max-w-md h-12 bg-gray-100 rounded mb-6" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="w-full bg-gray-50 border border-gray-100 p-4 h-80 rounded flex flex-col justify-end pb-6 px-6">
              <div className="w-full h-40 bg-gray-200 rounded mb-6" />
              <div className="w-3/4 h-6 bg-gray-200 rounded mb-2" />
              <div className="w-1/2 h-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
