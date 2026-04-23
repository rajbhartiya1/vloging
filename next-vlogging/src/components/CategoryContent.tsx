"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import { type Video } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowUpDown, Clock, Flame } from "lucide-react";

interface CategoryContentProps {
  initialVideos: Video[];
  categoryName: string;
}

type SortOption = "newest" | "popular" | "duration";

export default function CategoryContent({ initialVideos, categoryName }: CategoryContentProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const sortedVideos = useMemo(() => {
    const sorted = [...initialVideos];
    switch (sortBy) {
      case "popular":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        // Fallback simple sort using string date or id
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "duration":
        // Sort by id for mock duration since we don't have actual duration data
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }
    return sorted;
  }, [initialVideos, sortBy]);

  const displayedVideos = sortedVideos.slice(0, visibleCount);
  const hasMore = visibleCount < sortedVideos.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
        <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">
          Showing <span className="text-gray-900 dark:text-white font-bold">{displayedVideos.length}</span> of <span className="text-gray-900 dark:text-white font-bold">{sortedVideos.length}</span> videos
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 shrink-0">Sort by:</span>
          <button
            onClick={() => setSortBy("newest")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0 ${sortBy === "newest" ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
          >
            <ArrowUpDown size={14} /> Newest
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0 ${sortBy === "popular" ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
          >
            <Flame size={14} className={sortBy === "popular" ? "fill-orange-400 text-orange-400" : ""} /> Popular
          </button>
          <button
            onClick={() => setSortBy("duration")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors shrink-0 ${sortBy === "duration" ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
          >
            <Clock size={14} /> Duration
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
        {displayedVideos.length > 0 ? (
          displayedVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (Math.floor(index / 3) * 0.1) + ((index % 3) * 0.05) }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mb-4 text-gray-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-xl font-medium">No videos found for {categoryName}.</p>
          </div>
        )}
      </div>
      
      {/* Infinite Scroll Mock */}
      {hasMore && displayedVideos.length > 0 && (
        <div className="flex justify-center pb-12">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="flex items-center gap-2 bg-white dark:bg-zinc-900 border-2 border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-500 dark:hover:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold py-3 px-8 rounded-full transition-all shadow-sm disabled:opacity-70"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Loading...
              </>
            ) : (
              "Load More Videos"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
