import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function CreatorBadge() {
  return (
    <div className="flex items-center gap-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-white/20 dark:border-zinc-800/50 p-4 md:p-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] group">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity animate-pulse"></div>
        <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-white dark:border-zinc-900 relative z-10">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajcreator" alt="Creator" />
          <AvatarFallback className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">RC</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-extrabold text-gray-900 dark:text-gray-100 text-lg md:text-xl leading-tight">Raj creator</h3>
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1 line-clamp-1">Cinematic vlogger sharing epic adventures & tech setups.</p>
        <div className="flex gap-2 items-center">
          <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2 py-0">1.2M Subs</Badge>
          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider px-2 py-0 border-indigo-500/30 text-indigo-600 dark:text-indigo-400">Weekly</Badge>
        </div>
      </div>

      <Link href="/about" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white px-5 py-3 rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95">
        My Story
      </Link>
    </div>
  );
}
