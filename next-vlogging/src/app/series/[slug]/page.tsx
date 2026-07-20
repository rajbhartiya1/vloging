import React from 'react';
import SeriesHero from '@/components/SeriesHero';
import PlaylistSidebar from '@/components/PlaylistSidebar';

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formattedSlug = (slug ?? 'series').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Hero Section */}
      <SeriesHero 
        title={`${formattedSlug} Series`}
        description="Follow along on this incredible multi-part journey spanning gorgeous landscapes and urban jungles. Every episode brings a new adventure, local cuisines, and unforgettable memories."
        episodes={5}
      />

      <div className="flex flex-col lg:flex-row gap-6 lg:h-[700px]">
        {/* Main Video Area */}
        <div className="flex-1 min-w-0 bg-black rounded-xl overflow-hidden relative shadow-lg group flex items-center justify-center border border-border">
          {/* Mock Video Player for the current episode */}
          <div className="text-white/30 text-center flex flex-col items-center">
            <span className="text-7xl mb-6 bg-white/10 p-6 rounded-full group-hover:scale-110 transition duration-300 backdrop-blur-sm cursor-pointer hover:text-white/80">
              ▶
            </span>
            <p className="text-xl font-medium tracking-wide">Playing: Preparing for the Journey</p>
            <p className="text-sm mt-3 uppercase tracking-widest text-white/40">Episode 1</p>
          </div>
          
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black to-black/0 opacity-0 group-hover:opacity-100 transition duration-300">
             {/* Fake controls mock */}
             <div className="w-full h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-blue-500 rounded-full"></div>
             </div>
             <div className="flex justify-between items-center text-white font-mono text-sm">
               <span>04:15 / 12:40</span>
               <div className="flex gap-4">
                 <span>⚙</span>
                 <span>🔲</span>
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[400px] shrink-0 h-full">
          <PlaylistSidebar />
        </div>
      </div>
      
    </div>
  );
}
