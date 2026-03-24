import React from 'react';

interface SeriesHeroProps {
  title: string;
  description: string;
  episodes: number;
}

export default function SeriesHero({ title, description, episodes }: SeriesHeroProps) {
  return (
    <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-lg group">
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
      
      <div className="absolute z-20 left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-lg text-white">
        <span className="uppercase tracking-widest text-xs font-bold text-blue-400">Master Series</span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
          {title}
        </h1>
        <p className="text-white/80 line-clamp-2 md:line-clamp-3 leading-relaxed drop-shadow">
          {description}
        </p>
        <div className="flex gap-4 mt-2">
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition">
            ▶ Play All <span className="text-sm font-normal text-black/60">({episodes} eps)</span>
          </button>
          <button className="bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full font-bold hover:bg-white/30 transition">
            Save Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
