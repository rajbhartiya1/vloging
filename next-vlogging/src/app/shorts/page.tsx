"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Heart, MessageCircle, Share2, MoreVertical, Music, Sparkles, Shuffle, ScanLine } from "lucide-react";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/lib/utils";

type ShortVideo = {
  id: string;
  title: string;
  ytId: string;
  views: number;
  desc: string;
  author?: string;
  category?: string;
  tags?: string[];
};

type ShortsApiResponse = {
  data: ShortVideo[];
  pageInfo: {
    nextCursor: string | null;
    hasMore: boolean;
  };
};

const SHORTS_TOP_OFFSET_MOBILE = 64;
const SHORTS_TOP_OFFSET_DESKTOP = 72;

function getCategoryTheme(category?: string) {
  const normalized = category?.toLowerCase();

  if (normalized === "travel") {
    return {
      aura: "from-cyan-500/30 via-sky-500/20 to-emerald-400/20",
      chip: "bg-cyan-500/20 text-cyan-100 border-cyan-300/30",
      accent: "bg-cyan-400",
    };
  }

  if (normalized === "tech") {
    return {
      aura: "from-amber-500/30 via-orange-500/20 to-yellow-500/20",
      chip: "bg-amber-500/20 text-amber-100 border-amber-300/30",
      accent: "bg-amber-400",
    };
  }

  return {
    aura: "from-fuchsia-500/25 via-rose-500/20 to-pink-500/25",
    chip: "bg-rose-500/20 text-rose-100 border-rose-300/30",
    accent: "bg-rose-400",
  };
}

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
  const theme = getCategoryTheme(video.category);

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden flex items-center justify-center">
      <div className={cn("absolute inset-0 bg-gradient-to-br z-0", theme.aura)} />

      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md">
        <ScanLine size={14} className="text-white/90" />
        <span className="text-[11px] font-semibold tracking-wide text-white/90">VLOG LENS MODE</span>
      </div>
      
      <div className="relative z-10 w-full h-full max-w-lg mx-auto flex items-center justify-center bg-black">
         <iframe
          className={cn("w-full h-full transition-opacity duration-300", isActive ? "opacity-100" : "opacity-0")}
          src={`https://www.youtube.com/embed/${video.ytId}?autoplay=${isActive ? 1 : 0}&controls=1&mute=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide", theme.chip)}>
            {video.category ?? "Vibe"}
          </span>
          {(video.tags ?? []).slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm">
              #{tag}
            </span>
          ))}
        </div>
        <a
          href={`https://www.youtube.com/shorts/${video.ytId}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500 transition-colors w-fit"
        >
          Open on YouTube Shorts
        </a>
        <MusicTicker track="Original Audio - @VlogHub" />
      </div>

      <FloatingActionColumn videoId={video.id} initialLikes={video.views ? Math.floor(video.views/10) : 1000} />

      <div className="absolute top-0 left-0 h-full w-1.5 z-20 overflow-hidden">
        <div className={cn("h-20 w-full rounded-r-full mt-12 transition-all duration-500", theme.accent, isActive ? "opacity-90" : "opacity-0")} />
      </div>
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
  const [scanMode, setScanMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const getViewportHeight = useCallback(() => {
    const topOffset = window.innerWidth >= 768 ? SHORTS_TOP_OFFSET_DESKTOP : SHORTS_TOP_OFFSET_MOBILE;
    return Math.max(1, window.innerHeight - topOffset);
  }, []);

  const scrollToIndex = useCallback((targetIndex: number) => {
    if (!containerRef.current || shortsData.length === 0) {
      return;
    }

    const clampedIndex = Math.max(0, Math.min(targetIndex, shortsData.length - 1));
    const viewportHeight = getViewportHeight();

    isAnimatingRef.current = true;
    setActiveIndex(clampedIndex);
    containerRef.current.scrollTo({
      top: clampedIndex * viewportHeight,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 320);
  }, [getViewportHeight, shortsData.length]);

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

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    if (isAnimatingRef.current) {
      return;
    }

    const scrollPosition = containerRef.current.scrollTop;
    const clientHeight = getViewportHeight();
    const index = Math.max(0, Math.round(scrollPosition / clientHeight));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }

    const distanceToBottom = containerRef.current.scrollHeight - (scrollPosition + clientHeight);
    if (distanceToBottom < clientHeight * 1.5 && hasMore && !isLoading) {
      void fetchShorts(nextCursor, false);
    }
  }, [activeIndex, fetchShorts, getViewportHeight, hasMore, isLoading, nextCursor]);

  const goNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const goRandom = useCallback(() => {
    if (shortsData.length < 2) {
      return;
    }

    const current = activeIndex;
    const randomIndex = Math.floor(Math.random() * shortsData.length);
    const nextIndex = randomIndex === current ? (current + 1) % shortsData.length : randomIndex;
    scrollToIndex(nextIndex);
  }, [activeIndex, scrollToIndex, shortsData.length]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < 10 || isAnimatingRef.current) {
      return;
    }

    event.preventDefault();
    if (event.deltaY > 0) {
      goNext();
      return;
    }

    goPrev();
  }, [goNext, goPrev]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }, []);

  const handleTouchEnd = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    const touchStartY = touchStartYRef.current;
    if (touchStartY === null || isAnimatingRef.current) {
      return;
    }

    const touchEndY = event.changedTouches[0]?.clientY;
    if (typeof touchEndY !== "number") {
      return;
    }

    const delta = touchStartY - touchEndY;
    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta > 0) {
      goNext();
      return;
    }

    goPrev();
  }, [goNext, goPrev]);

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", keyHandler, { passive: false });
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [goNext, goPrev]);

  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) {
        return;
      }

      const viewportHeight = getViewportHeight();
      containerRef.current.scrollTo({ top: activeIndex * viewportHeight, behavior: "auto" });
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex, getViewportHeight]);

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
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full max-w-md bg-zinc-950 overflow-y-scroll snap-y snap-mandatory hide-scrollbar relative overscroll-none"
      >
        <div className="pointer-events-none absolute left-2 top-1/2 z-30 -translate-y-1/2 flex flex-col gap-2">
          {shortsData.slice(0, 10).map((video, index) => (
            <button
              key={`${video.id}-progress`}
              type="button"
              aria-label={`Go to short ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "pointer-events-auto h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/35 hover:bg-white/60"
              )}
            />
          ))}
        </div>

        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScanMode((value) => !value)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors",
              scanMode ? "border-emerald-300/40 bg-emerald-500/20 text-emerald-100" : "border-white/25 bg-black/40 text-white"
            )}
          >
            <Sparkles size={14} />
            Scan Mode
          </button>
          <button
            type="button"
            onClick={goRandom}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-black/65 transition-colors"
          >
            <Shuffle size={14} />
            Shuffle
          </button>
        </div>

        {shortsData.map((video, index) => (
          <div key={video.id} className="w-full snap-start relative shrink-0 h-[calc(100vh-64px)] md:h-[calc(100vh-72px)]">
             <div className={cn("h-full w-full transition-[filter] duration-300", !scanMode && activeIndex !== index ? "grayscale-[0.4] brightness-75" : "")}> 
               <ShortVideoPlayer video={video} isActive={activeIndex === index} />
             </div>
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
