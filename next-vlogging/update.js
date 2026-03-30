const fs = require('fs');
const content = `"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { type Video } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Check, Heart, MoreVertical } from "lucide-react";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

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
    <Link href={"/video/" + video.id} className="block h-full cursor-pointer">
      <motion.div
        whileHover={{ y: isRow ? -2 : -6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn("w-full h-full relative group transition-all duration-500")}
      >
        <Card className={cn(
          "h-full overflow-hidden bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border-gray-200/50 dark:border-white/5 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-all duration-300",
          isRow ? "flex flex-row items-center p-2 rounded-2xl" : "flex flex-col rounded-3xl"
        )}>
          <div className={cn(
            "relative overflow-hidden shrink-0",
            isRow ? "w-40 aspect-video rounded-xl" : "w-full aspect-video rounded-t-3xl"
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center font-bold text-indigo-300 dark:text-zinc-700 text-6xl tracking-tighter transition-transform duration-700 group-hover:scale-110">
              <img src={video.thumbnail || "https://images.unsplash.com/photo-1516280440502-a7f411c8b3d6?w=800&q=80&id=" + video.id} alt={video.title} className="object-cover w-full h-full opacity-80" />
            </div>

            <AnimatePresence>
              {(isHovered || isWatchLater) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-3 right-3 flex flex-col gap-2 z-40"
                >
                  <button
                    onClick={handleWatchLaterClick}
                    className={cn(
                      "bg-black/40 hover:bg-indigo-600 backdrop-blur-md text-white rounded-full transition-all shadow-lg p-2.5 flex items-center justify-center",
                    )}
                    title={isWatchLater ? "Added to Watch Later" : "Watch Later"}
                  >
                    {isWatchLater ? <Check size={16} strokeWidth={3} className="text-white" /> : <Clock size={16} strokeWidth={2.5} />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 backdrop-blur-md text-white text-xs font-bold rounded-md z-20">
              {video.duration || "10:24"}
            </div>

            {progress !== null && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20 overflow-hidden">
                <div
                  className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                  style={{ width: \`\${progress}%\` }}
                />
              </div>
            )}
            {isHovered && progress === null && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute bottom-0 left-0 h-1 bg-indigo-500 z-20 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
              />
            )}

            <div className="absolute inset-0 bg-black/10 dark:bg-black/30 flex items-center justify-center transition-all duration-300 z-10">
               <div className={cn("bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl text-white transform transition-transform", isRow ? "w-10 h-10 group-hover:scale-110" : "w-16 h-16 group-hover:scale-110")}>
                <Play size={isRow ? 18 : 28} className="fill-white translate-x-0.5 drop-shadow-md" />
              </div>
            </div>
          </div>

          <CardContent className={cn("flex-grow pt-4 pb-2 px-4", isRow && "py-0 pl-4 w-full")}>
            <div className="flex gap-3 relative">
              {!isRow && (
                <div className="shrink-0 mt-1">
                  <Avatar className="w-10 h-10 ring-2 ring-transparent group-hover:ring-indigo-500/20 transition-all">
                    <AvatarImage src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + video.author} />
                    <AvatarFallback>{video.author?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div className="flex flex-col w-full pr-6">
                <h3 className={cn("font-bold text-gray-900 dark:text-gray-100 leading-tight line-clamp-2 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400", isRow ? "text-sm md:text-md" : "text-base")}>
                  {video.title}
                </h3>
                <div className="mt-1.5 flex flex-col text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <span className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors">{video.author}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span>{video.views} views</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
              
              <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={18} />
              </button>
            </div>
          </CardContent>
          <CardFooter className="px-4 pb-4 pt-0">
            {!isRow && video.tags && video.tags.length > 0 && (
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-300 border-none">#{video.tags[0]}</Badge>
              </div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};
\`;
fs.writeFileSync('src/components/VideoCard.tsx', content);
