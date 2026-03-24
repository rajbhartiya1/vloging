import Link from "next/link";
import Image from "next/image";

export default function CreatorBadge() {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm transition-transform hover:scale-[1.02]">
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800">
          {/* Using a placeholder avatar until user uploads their own */}
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-zinc-500 dark:text-zinc-400">
            V
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm md:text-base leading-tight">VlogHub Creator</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Sharing my adventures with the world.</p>
      </div>
      <Link href="/about" className="text-xs md:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full transition-colors">
        My Story
      </Link>
    </div>
  );
}
