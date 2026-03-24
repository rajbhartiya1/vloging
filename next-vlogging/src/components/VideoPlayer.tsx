"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  videoId: string; // The youtube video ID
  className?: string;
}

export default function VideoPlayer({ videoId, className }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shadow-xl", className)}>
      {/* Skeleton Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-zinc-800 animate-pulse">
           <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        </div>
      )}
      
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
        title="Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}