import React from "react";

export default function PageSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#050505] overflow-hidden relative">
      {/* Skeleton Navbar */}
      <div className="w-full h-20 border-b border-white/10 flex items-center justify-between px-10 absolute top-0 left-0 z-50">
        <div className="w-12 h-12 bg-white/5 rounded-full animate-pulse" />
        <div className="flex gap-8 hidden md:flex">
          <div className="w-16 h-4 bg-white/5 rounded animate-pulse" />
          <div className="w-16 h-4 bg-white/5 rounded animate-pulse" />
          <div className="w-16 h-4 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Skeleton Hero Image Area */}
      <div className="w-full h-screen bg-white/5 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Skeleton Hero Content */}
        <div className="absolute bottom-32 left-10 md:left-20">
          <div className="w-20 h-4 bg-white/10 rounded animate-pulse mb-6" />
          <div className="w-[80vw] md:w-96 h-24 bg-white/10 rounded animate-pulse mb-8" />
          <div className="w-48 h-12 bg-blue-600/20 rounded animate-pulse" />
        </div>
      </div>

      {/* Skeleton Content Section Below Fold */}
      <div className="w-full px-10 md:px-20 py-24 bg-white">
        <div className="w-64 h-10 bg-gray-200 rounded animate-pulse mx-auto mb-10" />
        <div className="w-full max-w-3xl h-24 bg-gray-100 rounded animate-pulse mx-auto mb-20" />

        {/* 3-Column Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-full">
              <div className="w-full h-64 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="w-full h-4 bg-gray-100 rounded animate-pulse mb-2" />
              <div className="w-5/6 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
