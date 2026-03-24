
import { getVideoById, getRelatedVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import CommentSection from "@/components/CommentSection";
import VideoPlayer from "@/components/VideoPlayer";
import ActionRibbon from "@/components/ActionRibbon";
import DescriptionBox from "@/components/DescriptionBox";
import CreatorBadge from "@/components/CreatorBadge";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

// Next.js 15 valid type signature for params
export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    notFound();
  }

  const relatedVideos = getRelatedVideos(video.category, video.id, 6);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
      {/* Main Video Content - Left Column (takes 2/3 space on XL) */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800">
          <VideoPlayer videoId={video.ytId} className="w-full rounded-none" />
          
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
              {video.title}
            </h1>
            
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-6">
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {video.views.toLocaleString()} views
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 hidden sm:block"></span>
                <span>{video.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 hidden sm:block"></span>
                <Badge variant="secondary" className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50">
                  {video.category}
                </Badge>
              </div>
              
              <ActionRibbon videoId={video.id} initialLikes={Math.floor(video.views * 0.05)} />
            </div>
            
            <div className="py-6 border-y border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center mb-6">
              <CreatorBadge />
              <Button variant="destructive" className="rounded-full shadow-md font-bold px-8 shadow-red-500/20 hover:shadow-red-500/40 w-full sm:w-auto transition-all">
                Subscribe
              </Button>
            </div>

            <DescriptionBox description={video.desc} tags={video.tags} />
          </div>
        </div>

        <CommentSection videoId={id} />
      </div>

      {/* Sidebar - Right Column (takes 1/3 space on XL) */}
      <div className="xl:col-span-1 border-gray-200 dark:border-zinc-800 space-y-4">
        <h3 className="text-xl font-bold px-1 text-gray-900 dark:text-white">Up Next</h3>
        <div className="flex flex-col gap-4">
          {relatedVideos.map((v) => (
            <VideoCard key={v.id} video={v} layout="row" />
          ))}
        </div>
      </div>
    </div>
  );
}
