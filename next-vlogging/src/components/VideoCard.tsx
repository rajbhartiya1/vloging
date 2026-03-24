"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { type Video } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Check } from "lucide-react";
import { useUserDataStore } from "@/store/userDataStore";

export default function VideoCard({ video }: { video: Video }) {
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

  return (
    <Link href={`/video/${video.id}`} className="block">
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-none dark:border dark:border-zinc-800 transition-all duration-300 group relative"
      >
        <div className="w-full aspect-video bg-gray-200 dark:bg-zinc-800 relative flex items-center justify-center overflow-hidden">
          {/* using fallback color instead of actual image if not available */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center font-bold text-indigo-300 dark:text-indigo-700 text-4xl tracking-tighter transition-transform duration-700 group-hover:scale-105">
            {video.title.substring(0, 2).toUpperCase()}
          </div>
          
          {/* Watch Later Quick Action (Visible on Hover in Desktop, persistent simple icon on mobile) */}
          <AnimatePresence>
            {(isHovered || isWatchLater) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleWatchLaterClick}
                className="absolute top-3 right-3 z-30 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-colors shadow-lg"
                title="Watch Later"
              >
                {isWatchLater ? <Check size={18} className="text-green-400" /> : <Clock size={18} />}
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
              <div className="absolute w-16 h-16 bg-white/30 dark:bg-indigo-500/30 rounded-full animate-ping" />
              <div className="w-12 h-12 bg-white dark:bg-indigo-500 rounded-full flex items-center justify-center shadow-lg text-indigo-600 dark:text-white pl-1">
                <Play size={20} className="fill-current" />
              </div>
            </motion.div>
          </div>
          
          {/* In a real project, use next/image here */}
          {/* <Image src={video.thumbnail} alt={video.title} fill className="object-cover" /> */}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{video.title}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              {video.category}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
