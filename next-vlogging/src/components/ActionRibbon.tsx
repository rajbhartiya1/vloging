"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUserDataStore } from "@/store/userDataStore";
import { ThumbsUp, ThumbsDown, Share2, Save, Download, Copy, X } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useMemo, useRef, useState } from "react";

interface ActionRibbonProps {
  videoId: string;
  initialLikes?: number;
}

export default function ActionRibbon({ videoId, initialLikes = 12000 }: ActionRibbonProps) {
  const { getInteraction, setInteraction, toggleWatchLater, isInWatchLater } = useUserDataStore();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const interaction = getInteraction(videoId);
  const isSaved = isInWatchLater(videoId);
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `https://example.com/video/${videoId}`;
    }
    return `${window.location.origin}/video/${videoId}`;
  }, [videoId]);

  // Formatter for likes
  const formatLikes = (num: number) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num.toString();
  };

  const currentLikes = interaction === 'like' ? initialLikes + 1 : initialLikes;

  useEffect(() => {
    if (!isShareOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!shareRef.current?.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsShareOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isShareOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

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
      <div className="relative" ref={shareRef}>
        <Button
          variant="secondary"
          onClick={() => setIsShareOpen((prev) => !prev)}
          className={`rounded-full gap-2 text-gray-700 dark:text-gray-300 transition-all ${isShareOpen ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" : ""}`}
        >
          <Share2 size={18} /> Share
        </Button>

        <AnimatePresence>
          {isShareOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-0 z-30 mt-3 w-72 rounded-2xl border border-indigo-100 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/95"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Share this video</p>
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-zinc-800 dark:hover:text-gray-200"
                  aria-label="Close share popup"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-2 text-xs text-gray-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300">
                <span className="block truncate">{shareUrl}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  <Copy size={14} />
                  {copied ? "Copied" : "Copy link"}
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
                >
                  X
                </a>
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
