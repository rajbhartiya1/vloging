"use client";
import Link from "next/link";
import { categories } from "@/lib/data";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CategoryPills() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // Add "All" as first mock category
  const allCategories = [{ id: "all", name: "All", slug: "all", description: "" }, ...categories];

  return (
    <div className="w-full relative mt-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 snap-x snap-mandatory px-4 md:px-8">
        {allCategories.map((cat, idx) => {
          const isAll = cat.slug === "all";
          return (
            <Link
              key={cat.slug}
              href={isAll ? "/" : `/category/${cat.slug}`}
              className="flex-none snap-center relative"
              onMouseEnter={() => setHoveredIndex(cat.slug)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`whitespace-nowrap ${isAll ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-md border-transparent" : "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-gray-200/60 dark:border-white/10 text-gray-700 dark:text-gray-300"} hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-sm`}
              >
                {cat.name}
              </motion.div>
              {hoveredIndex === cat.slug && !isAll && (
                <motion.div 
                  layoutId="pillHover"
                  className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-full -z-10 border border-indigo-200 dark:border-indigo-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          );
        })}
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
