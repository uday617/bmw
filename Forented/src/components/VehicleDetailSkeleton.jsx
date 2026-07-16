import React from "react";

export default function VehicleDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white relative z-50">
      <div className="h-20 border-b border-gray-100 flex items-center px-10">
         <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="w-full h-[60vh] bg-gray-100 animate-pulse" />
      <div className="px-10 py-16 max-w-6xl mx-auto animate-pulse">
         <div className="w-64 h-10 bg-gray-200 rounded mb-4" />
         <div className="w-32 h-6 bg-gray-200 rounded mb-10" />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-4">
               <div className="w-full h-4 bg-gray-100 rounded" />
               <div className="w-full h-4 bg-gray-100 rounded" />
               <div className="w-5/6 h-4 bg-gray-100 rounded" />
            </div>
            <div className="w-full h-48 bg-gray-50 border border-gray-100 rounded" />
         </div>
      </div>
    </div>
  );
}
