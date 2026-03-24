"use client";

import { useUserDataStore } from "@/store/userDataStore";
import { ThumbsUp, ThumbsDown, Share2, Save, Download } from "lucide-react";
import { Button } from "./ui/button";

interface ActionRibbonProps {
  videoId: string;
  initialLikes?: number;
}

export default function ActionRibbon({ videoId, initialLikes = 12000 }: ActionRibbonProps) {
  const { getInteraction, setInteraction, toggleWatchLater, isInWatchLater } = useUserDataStore();

  const interaction = getInteraction(videoId);
  const isSaved = isInWatchLater(videoId);

  // Formatter for likes
  const formatLikes = (num: number) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num.toString();
  };

  const currentLikes = interaction === 'like' ? initialLikes + 1 : initialLikes;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Like / Dislike Group */}
      <div className="flex items-center bg-gray-100 dark:bg-zinc-800 rounded-full">
        <button 
          onClick={() => setInteraction(videoId, 'like')}
          className={`flex items-center gap-2 px-4 py-2 rounded-l-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors ${interaction === 'like' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
        >
          <ThumbsUp size={18} className={interaction === 'like' ? 'fill-current' : ''} />
          <span>{formatLikes(currentLikes)}</span>
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-zinc-600" />
        <button 
          onClick={() => setInteraction(videoId, 'dislike')}
          className={`px-4 py-2 rounded-r-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors ${interaction === 'dislike' ? 'text-red-500 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
        >
          <ThumbsDown size={18} className={interaction === 'dislike' ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Share */}
      <Button variant="secondary" className="rounded-full gap-2 text-gray-700 dark:text-gray-300">
        <Share2 size={18} /> Share
      </Button>

      {/* Download */}
      <Button variant="secondary" className="rounded-full gap-2 text-gray-700 dark:text-gray-300 hidden sm:flex">
        <Download size={18} /> Download
      </Button>

      {/* Save (Watch Later) */}
      <Button 
        variant="secondary" 
        onClick={() => toggleWatchLater(videoId)}
        className={`rounded-full gap-2 ${isSaved ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900' : 'text-gray-700 dark:text-gray-300'}`}
      >
        <Save size={18} className={isSaved ? 'fill-current' : ''} />
        {isSaved ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
}
