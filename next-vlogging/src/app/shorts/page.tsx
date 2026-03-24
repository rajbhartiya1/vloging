"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, MoreVertical, Music } from "lucide-react";
import { getLatestVideos } from "@/lib/data";

// Mock shorts
export default function ShortsPage() {
  const shorts = getLatestVideos(5); // Reuse video mocked data for now

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] w-full max-w-[500px] mx-auto snap-y snap-mandatory overflow-y-scroll hide-scrollbar bg-black md:rounded-3xl md:border md:border-zinc-800">
      {shorts.map((short, index) => (
        <ShortVideo key={short.id} short={short} isActive={index === 0} />
      ))}
    </div>
  );
}

function ShortVideo({ short, isActive }: { short: any; isActive: boolean }) {
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={videoRef} 
      className="relative w-full h-full snap-start snap-always bg-zinc-900 overflow-hidden flex items-center justify-center text-white"
    >
      {/* Video Placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-b from-indigo-900 to-black transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-50'}`}>
         <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl opacity-10">SHORTS</h1>
         </div>
      </div>

      {/* Play/Pause Overlay visually only for this mock */}
      {!isPlaying && (
         <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
               <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
            </div>
         </div>
      )}

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pb-20 md:pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500 border border-white flex items-center justify-center font-bold text-sm">
            V
          </div>
          <span className="font-bold text-lg">@VlogHub</span>
          <button className="px-3 py-1 bg-white text-black font-semibold text-xs rounded-full ml-2">
            Subscribe
          </button>
        </div>
        <p className="text-sm w-[80%] mb-4 line-clamp-2">{short.title} - #shorts #lifestyle</p>
        
        <div className="flex items-center gap-2 text-sm">
           <Music size={16} />
           <span className="animate-pulse">Original Audio - VlogHub</span>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute right-4 bottom-20 md:bottom-12 flex flex-col gap-6 items-center z-20">
        <button className="flex flex-col items-center gap-1" onClick={() => setIsLiked(!isLiked)}>
          <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
             <Heart className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} size={26} />
          </div>
          <span className="text-xs font-medium">{isLiked ? '12.4k' : '12.3k'}</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
             <MessageCircle className="text-white" size={26} />
          </div>
          <span className="text-xs font-medium">842</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
             <Share2 className="text-white" size={26} />
          </div>
          <span className="text-xs font-medium">Share</span>
        </button>

        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
             <MoreVertical className="text-white" size={26} />
          </div>
        </button>
      </div>
    </div>
  );
}
