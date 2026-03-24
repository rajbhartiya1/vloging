import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getTrendingVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";

export default function NotFound() {
  const suggestedVideos = getTrendingVideos(3);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Glitch Effect Logo / 404 text */}
      <h1 className="text-8xl md:text-9xl font-black text-gray-900 dark:text-white tracking-widest relative inline-block mb-6">
        <span className="absolute -left-1 -top-1 font-black text-red-500 opacity-70 mix-blend-multiply filter blur-[1px]">404</span>
        <span className="absolute -right-1 -bottom-1 font-black text-blue-500 opacity-70 mix-blend-multiply filter blur-[1px]">404</span>
        404
      </h1>
      
      <h2 className="text-3xl font-bold mb-4">Video Not Found (Or Lost in Cyberspace)</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto text-lg">
        The page or vlog you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Return Home Button */}
      <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-200">
        <Link href="/">
          Take Me Home
        </Link>
      </Button>

      {/* Suggested Content Grid */}
      <div className="mt-20 w-full max-w-6xl text-left">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>👀</span> Keep Watching
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
