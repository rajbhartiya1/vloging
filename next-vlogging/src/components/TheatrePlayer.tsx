import React from 'react';

export default function TheatrePlayer() {
  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group flex items-center justify-center">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
        <span className="bg-black/50 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded">12,404 watching</span>
      </div>
      <div className="text-white/30 flex flex-col items-center gap-4">
        <span className="text-6xl text-white/10">▶</span>
        <p className="font-semibold text-lg">Live Stream is Loading...</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-4 items-center text-white">
          <button className="hover:text-blue-400 transition-colors">▶</button>
          <div className="w-48 h-1 bg-white/20 rounded-full cursor-pointer">
            <div className="w-1/4 h-full bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-sm font-medium">Auto</span>
        </div>
        <div className="flex gap-3 text-white">
          <button className="hover:text-blue-400 transition-colors">⚙️</button>
          <button className="hover:text-blue-400 transition-colors">🔲</button>
        </div>
      </div>
    </div>
  );
}
