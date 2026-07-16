import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-white relative z-50">
      {/* Navbar space */}
      <div className="h-20 border-b border-gray-100 flex items-center justify-between px-10">
         <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
         <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Hero */}
      <div className="pt-24 px-16 pb-10 flex items-center gap-12 border-b border-gray-100 animate-pulse">
        <div className="w-32 h-32 bg-gray-200 rounded-full shrink-0" />
        <div>
          <div className="w-64 h-10 bg-gray-200 rounded mb-4" />
          <div className="w-96 h-4 bg-gray-100 rounded mb-2" />
          <div className="w-80 h-4 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Body */}
      <div className="flex px-16 py-12 gap-16 max-w-7xl animate-pulse">
        <div className="w-56 shrink-0 flex flex-col gap-4">
           <div className="w-24 h-3 bg-gray-200 rounded mb-4" />
           <div className="w-32 h-4 bg-gray-100 rounded" />
           <div className="w-32 h-4 bg-gray-100 rounded" />
           <div className="w-32 h-4 bg-gray-100 rounded" />
        </div>
        <div className="flex-1 flex flex-col gap-8">
           <div className="w-48 h-8 bg-gray-200 rounded" />
           <div className="w-full h-32 bg-gray-50 border border-gray-100 rounded p-6">
              <div className="w-32 h-4 bg-gray-200 rounded mb-6" />
              <div className="w-full h-12 bg-gray-100 rounded" />
           </div>
        </div>
      </div>
    </div>
  );
}
