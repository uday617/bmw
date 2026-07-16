import React from "react";

export default function AuthSkeleton() {
  return (
    <div className="w-full h-screen bg-[#06000a] flex items-center justify-end overflow-hidden fixed top-0 left-0 z-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_40%_55%,#180008_0%,#08000e_45%,#030008_100%)] z-0" />
      
      <div className="relative z-10 mr-[6vw] w-full max-w-[380px] bg-white/5 backdrop-blur-md border border-white/10 p-10 animate-pulse rounded">
        <div className="w-48 h-8 bg-white/10 rounded mb-10" />
        <div className="flex flex-col gap-8 mb-10">
          <div>
            <div className="w-16 h-3 bg-white/10 rounded mb-2" />
            <div className="w-full h-6 bg-white/5 rounded border-b border-white/10" />
          </div>
          <div>
            <div className="w-20 h-3 bg-white/10 rounded mb-2" />
            <div className="w-full h-6 bg-white/5 rounded border-b border-white/10" />
          </div>
        </div>
        <div className="w-full h-12 bg-red-600/20 border border-red-600/30 rounded mt-4" />
      </div>
    </div>
  );
}
