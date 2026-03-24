"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DescriptionBoxProps {
  description: string;
  tags: string[];
}

export default function DescriptionBox({ description, tags }: DescriptionBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-5 mb-8 relative transition-all duration-300">
      <div
        className={`relative text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap ${
          !isExpanded ? "line-clamp-3" : ""
        }`}
      >
        {description}
      </div>

      {/* Fade overlay when collapsed */}
      {!isExpanded && (
        <div className="absolute bottom-12 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 dark:from-zinc-800/50 to-transparent pointer-events-none" />
      )}

      {isExpanded && tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-zinc-700/50">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 cursor-pointer transition-colors"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        {isExpanded ? (
          <>
            Show less <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Show more <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
