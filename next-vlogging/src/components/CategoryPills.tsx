"use client";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryPills() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 snapy-x snap-mandatory">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="flex-none snap-center whitespace-nowrap bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow"
          >
            {cat.name}
          </Link>
        ))}
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
