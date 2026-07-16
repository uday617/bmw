import React from "react";

export default function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex relative z-50">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 animate-pulse p-6">
         <div className="w-32 h-8 bg-gray-700 rounded mb-16" />
         <div className="space-y-6">
            <div className="w-full h-6 bg-gray-700 rounded" />
            <div className="w-full h-6 bg-gray-700 rounded" />
            <div className="w-full h-6 bg-gray-700 rounded" />
         </div>
      </div>
      {/* Main */}
      <div className="flex-1 p-10 animate-pulse">
         <div className="w-48 h-10 bg-gray-200 rounded mb-10" />
         <div className="grid grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white rounded shadow-sm" />)}
         </div>
         <div className="w-full h-96 bg-white rounded shadow-sm" />
      </div>
    </div>
  );
}
