
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { type Video } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Check } from "lucide-react";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/lib/utils";

export default function VideoCard({ video, layout = "grid" }: { video: Video, layout?: "grid" | "row" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { getHistoryProgress, toggleWatchLater, isInWatchLater } = useUserDataStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const progress = mounted ? getHistoryProgress(video.id) : null;
  const isWatchLater = mounted ? isInWatchLater(video.id) : false;

  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchLater(video.id);
  };

  const isRow = layout === "row";

  return (
    <Link href={`/video/${video.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: isRow ? -2 : -8, scale: isRow ? 1.01 : 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          "bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-none dark:border dark:border-zinc-800 transition-all duration-300 group relative h-full",
          isRow ? "flex flex-row items-center gap-4 p-2 shadow-sm" : "flex flex-col"
        )}
      >
        <div className={cn(
          "bg-gray-200 dark:bg-zinc-800 relative flex items-center justify-center overflow-hidden shrink-0",
          isRow ? "w-32 sm:w-40 aspect-video rounded-xl" : "w-full aspect-video"
        )}>
          {/* using fallback color instead of actual image if not available */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center font-bold text-indigo-300 dark:text-indigo-700 text-2xl md:text-4xl tracking-tighter transition-transform duration-700 group-hover:scale-105">
            {video.title.substring(0, 2).toUpperCase()}
          </div>

          <AnimatePresence>
            {(isHovered || isWatchLater) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleWatchLaterClick}
                className={cn(
                  "absolute z-30 bg-black/60 hover:bg-black/80 text-white rounded-lg backdrop-blur-sm transition-colors shadow-lg",
                  isRow ? "top-1 right-1 p-1 md:top-2 md:right-2 md:p-1.5" : "top-3 right-3 p-2"
                )}
                title="Watch Later"
              >
                {isWatchLater ? <Check size={isRow ? 14 : 18} className="text-green-400" /> : <Clock size={isRow ? 14 : 18} />}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Historical Progress Bar */}
          {progress !== null && (
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200/20 dark:bg-zinc-800/50 z-20">
              <div
                className="h-full bg-red-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}

          {/* Simulated Hover Video Preview (Progress Bar) overriding static progress */}
          {isHovered && progress === null && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-indigo-500 z-20"
            />
          )}

          {/* Play Button Overlay */}
          <div className={`absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className={cn("absolute bg-white/30 dark:bg-indigo-500/30 rounded-full animate-ping", isRow ? "w-8 h-8" : "w-16 h-16")} />
              <div className={cn("bg-white dark:bg-indigo-500 rounded-full flex items-center justify-center shadow-lg text-indigo-600 dark:text-white pl-1", isRow ? "w-8 h-8" : "w-12 h-12")}>
                <Play size={isRow ? 12 : 20} className="fill-current -ml-0.5" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className={cn("flex flex-col justify-center", isRow ? "py-2 pr-2" : "p-6")}>
          <h3 className={cn(
            "font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors",
            isRow ? "space-y-1 text-sm md:text-base line-clamp-2 mb-1" : "text-xl mb-3 line-clamp-2"
          )}>
            {video.title}
          </h3>
          <div className={cn(
            "flex text-gray-600 dark:text-gray-400",
            isRow ? "flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2 text-xs" : "items-center gap-3 text-sm"
          )}>
            <span className={cn(
              "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full font-semibold tracking-wide",
              isRow ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
            )}>
              {video.category}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <svg className={cn("fill-none", isRow ? "w-3 h-3" : "w-4 h-4")} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {video.views.toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
