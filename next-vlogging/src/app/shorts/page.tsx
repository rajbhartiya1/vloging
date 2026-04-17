"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Heart, MessageCircle, Share2, MoreVertical, Music } from "lucide-react";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/lib/utils";

type ShortVideo = {
  id: string;
  title: string;
  ytId: string;
  views: number;
  desc: string;
  author?: string;
};

type ShortsApiResponse = {
  data: ShortVideo[];
  pageInfo: {
    nextCursor: string | null;
    hasMore: boolean;
  };
};

function MusicTicker({ track }: { track: string }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden w-48">
      <Music size={16} className="text-white shrink-0" />
      <div className="whitespace-nowrap animate-marquee flex text-white text-sm">
        <span className="mr-8">{track}</span>
        <span>{track}</span>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

function FloatingActionColumn({ videoId, initialLikes }: { videoId: string, initialLikes: number }) {
  const { getInteraction, setInteraction } = useUserDataStore();
  const interaction = getInteraction(videoId);
  const currentLikes = interaction === 'like' ? initialLikes + 1 : initialLikes;
  
  const formatLikes = (num: number) => num > 999 ? (num/1000).toFixed(1) + 'k' : num.toString();

  return (
    <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
      <button 
        onClick={() => setInteraction(videoId, interaction === 'like' ? null : 'like')}
        className="flex flex-col items-center gap-1 group"
      >
        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition-colors">
          <Heart size={24} className={cn("transition-colors", interaction === 'like' ? "fill-red-500 text-red-500" : "text-white")} />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-md">{formatLikes(currentLikes)}</span>
      </button>

      <button className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition-colors">
          <MessageCircle size={24} className="text-white" />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-md">1.2k</span>
      </button>

      <button className="flex flex-col items-center gap-1 group">
        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/60 transition-colors">
          <Share2 size={24} className="text-white" />
        </div>
        <span className="text-white text-xs font-medium drop-shadow-md">Share</span>
      </button>

      <button className="flex flex-col items-center gap-1 group mt-2">
        <MoreVertical size={24} className="text-white" />
      </button>
    </div>
  );
}

function ShortVideoPlayer({ video, isActive }: { video: ShortVideo; isActive: boolean }) {
  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 z-0" />
      
      <div className="relative z-10 w-full h-full max-w-lg mx-auto flex items-center justify-center bg-black">
         <iframe
          className={cn("w-full h-full pointer-events-none transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0")}
          src={`https://www.youtube.com/embed/${video.ytId}?autoplay=${isActive ? 1 : 0}&controls=0&mute=0&loop=1&playlist=${video.ytId}&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10 pointer-events-none" />

      <div className="absolute bottom-6 left-4 right-20 z-20 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center text-white font-bold shadow-md overflow-hidden relative">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(video.title)}`}
              alt={`${video.title}`}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm shadow-black drop-shadow-md">@VlogHub</h3>
            <span className="text-white/80 text-xs text-shadow-sm flex items-center gap-1 bg-white/20 px-2 rounded-full w-fit backdrop-blur-sm">
              Subscribe
            </span>
          </div>
        </div>
        <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md pr-4 shadow-black">
          {video.title} - {video.desc}
        </p>
        <MusicTicker track="Original Audio - @VlogHub" />
      </div>

      <FloatingActionColumn videoId={video.id} initialLikes={video.views ? Math.floor(video.views/10) : 1000} />
    </div>
  );
}

export default function ShortsFeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shortsData, setShortsData] = useState<ShortVideo[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const fetchShorts = useCallback(async (cursor: string | null, replace: boolean) => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const params = new URLSearchParams({
        limit: "5",
        sort: "trending",
      });
      if (cursor) {
        params.set("cursor", cursor);
      }

      const response = await fetch(`/api/shorts?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load shorts feed");
      }

      const payload = (await response.json()) as ShortsApiResponse;
      setShortsData((current) => (replace ? payload.data : [...current, ...payload.data]));
      setNextCursor(payload.pageInfo.nextCursor);
      setHasMore(payload.pageInfo.hasMore);
    } catch {
      setErrorMessage("Unable to load shorts right now. Please try again.");
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    void fetchShorts(null, true);
  }, [fetchShorts]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPosition = containerRef.current.scrollTop;
    const clientHeight = containerRef.current.clientHeight;
    const index = Math.round(scrollPosition / clientHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }

    const distanceToBottom = containerRef.current.scrollHeight - (scrollPosition + clientHeight);
    if (distanceToBottom < clientHeight * 1.5 && hasMore && !isLoading) {
      void fetchShorts(nextCursor, false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 top-[64px] pb-[72px] md:pb-0 md:top-[72px] z-50 bg-black flex items-center justify-center">
        <p className="text-white/80 text-sm">Loading shorts feed...</p>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 top-[64px] pb-[72px] md:pb-0 md:top-[72px] z-50 bg-black flex justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full max-w-md bg-zinc-950 overflow-y-scroll snap-y snap-mandatory hide-scrollbar relative"
      >
        {shortsData.map((video, index) => (
          <div key={video.id} className="w-full h-full snap-start relative shrink-0">
             <ShortVideoPlayer video={video} isActive={activeIndex === index} />
          </div>
        ))}

        {errorMessage && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-red-500/90 text-white text-xs px-3 py-2 rounded-md">
            {errorMessage}
          </div>
        )}

        {!hasMore && shortsData.length > 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-white/10 text-white text-xs px-3 py-2 rounded-md">
            End of shorts feed
          </div>
        )}
      </div>
    </div>
  );
}
