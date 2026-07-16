import React from "react";

export default function CartSkeleton() {
  return (
    <div className="min-h-screen bg-white relative z-50">
      <div className="h-20 border-b border-gray-100 flex items-center px-10">
         <div className="w-12 h-12 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="pt-24 px-8 max-w-5xl mx-auto pb-20 animate-pulse">
        <div className="w-48 h-10 bg-gray-200 rounded mb-8" />
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8 gap-8 pb-4">
           <div className="w-32 h-6 bg-gray-200 rounded" />
           <div className="w-24 h-6 bg-gray-100 rounded" />
           <div className="w-24 h-6 bg-gray-100 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Items List */}
           <div className="md:col-span-2 space-y-4">
              {[1, 2].map((item) => (
                 <div key={item} className="w-full h-32 border border-gray-100 bg-gray-50 rounded flex p-6 gap-6">
                    <div className="w-24 h-20 bg-gray-200 rounded shrink-0" />
                    <div className="w-full">
                       <div className="w-48 h-6 bg-gray-200 rounded mb-2" />
                       <div className="w-32 h-4 bg-gray-100 rounded" />
                    </div>
                 </div>
              ))}
           </div>
           
           {/* Summary Card */}
           <div className="bg-gray-50 border border-gray-100 p-6 h-64 rounded">
              <div className="w-32 h-6 bg-gray-200 rounded mb-8" />
              <div className="flex justify-between mb-4"><div className="w-16 h-4 bg-gray-100 rounded"/><div className="w-16 h-4 bg-gray-100 rounded"/></div>
              <div className="flex justify-between mb-4"><div className="w-16 h-4 bg-gray-100 rounded"/><div className="w-16 h-4 bg-gray-100 rounded"/></div>
              <div className="w-full h-1 bg-gray-200 mb-4" />
              <div className="flex justify-between mb-8"><div className="w-20 h-5 bg-gray-200 rounded"/><div className="w-20 h-5 bg-gray-200 rounded"/></div>
              <div className="w-full h-12 bg-blue-600/20 rounded" />
           </div>
        </div>
      </div>
    </div>
  );
}
