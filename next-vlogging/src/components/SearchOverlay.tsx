"use client";

import { useState, useEffect } from "react";
import { Search, X, Video, ShoppingBag, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getLatestVideos } from "@/lib/data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  
  // Use real data to mock search results
  const videos = getLatestVideos(10);
  const results = query.length > 2 
    ? videos.filter(v => v.title.toLowerCase().includes(query.toLowerCase()) || v.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-zinc-950/80 backdrop-blur-md p-4 sm:p-6 pt-[10vh] flex justify-center items-start"
        >
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
              <Search className="text-gray-400 shrink-0" size={24} />
              <input
                autoFocus
                type="text"
                placeholder="Search videos, categories, or merch..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none px-4 text-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              />
              <button 
                onClick={onClose}
                className="bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:text-gray-900 dark:hover:text-white p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Results Area */}
            <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
              {query.length > 0 && query.length <= 2 ? (
                <div className="text-center py-12 text-gray-500">
                  Keep typing to search...
                </div>
              ) : query.length > 2 && results.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No results found for "{query}"
                </div>
              ) : query.length > 2 ? (
                <div className="space-y-6">
                  {/* Videos */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Videos</h3>
                    <div className="space-y-1">
                      {results.map(video => (
                        <Link 
                          key={video.id} 
                          href={`/video/${video.id}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-indigo-500">
                            <Video size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {video.title}
                            </p>
                            <p className="text-sm text-gray-500">{video.category} • {video.views.toLocaleString()} views</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Default State (Empty Query)
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Quick Links</h3>
                    <Link href="/shop" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 text-gray-700 dark:text-gray-300 font-medium">
                       <ShoppingBag size={18} className="text-indigo-500" /> Creator Store
                    </Link>
                    {/* <Link href="/community" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 text-gray-700 dark:text-gray-300 font-medium">
                       <Hash size={18} className="text-indigo-500" /> Community
                    </Link> */}
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 dark:bg-zinc-950 p-4 border-t border-gray-200 dark:border-zinc-800 text-center text-xs text-gray-500">
              Press <kbd className="font-mono bg-white dark:bg-zinc-800 border dark:border-zinc-700 px-1.5 py-0.5 rounded mx-1">ESC</kbd> to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
