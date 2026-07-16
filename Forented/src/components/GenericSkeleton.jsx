import React from "react";

export default function GenericSkeleton() {
  return (
    <div className="min-h-screen bg-white relative z-50">
      <div className="h-20 border-b border-gray-100 flex items-center justify-between px-10">
         <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
         <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="px-10 py-20 animate-pulse max-w-6xl mx-auto">
        <div className="w-1/3 h-10 bg-gray-200 rounded mb-10" />
        
        {/* Tabs skeleton */}
        <div className="flex gap-8 border-b border-gray-100 mb-8 pb-4">
           <div className="w-24 h-4 bg-gray-200 rounded" />
           <div className="w-24 h-4 bg-gray-100 rounded" />
           <div className="w-24 h-4 bg-gray-100 rounded" />
        </div>

        {/* Content Box */}
        <div className="w-full h-64 bg-gray-50 border border-gray-100 rounded mb-6" />
        <div className="w-2/3 h-6 bg-gray-100 rounded mb-4" />
        <div className="w-1/2 h-6 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
