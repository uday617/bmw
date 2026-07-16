import React from "react";

export default function FormSkeleton() {
  return (
    <div className="min-h-screen bg-white relative z-50">
      <div className="h-20 border-b border-gray-100 flex items-center px-10">
         <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-80px)] animate-pulse">
         <div className="p-16 border-r border-gray-100">
            <div className="w-48 h-10 bg-gray-200 rounded mb-10" />
            <div className="space-y-6">
               <div className="w-full h-12 bg-gray-50 border border-gray-100 rounded" />
               <div className="w-full h-12 bg-gray-50 border border-gray-100 rounded" />
               <div className="grid grid-cols-2 gap-6">
                  <div className="w-full h-12 bg-gray-50 border border-gray-100 rounded" />
                  <div className="w-full h-12 bg-gray-50 border border-gray-100 rounded" />
               </div>
               <div className="w-full h-32 bg-gray-50 border border-gray-100 rounded mt-10" />
            </div>
         </div>
         <div className="bg-gray-50 h-full flex items-center justify-center">
            <div className="w-2/3 h-64 bg-gray-200 rounded" />
         </div>
      </div>
    </div>
  );
}
