
import { getVideoById, getRelatedVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import CommentSection from "@/components/CommentSection";
import VideoPlayer from "@/components/VideoPlayer";
import ActionRibbon from "@/components/ActionRibbon";
import DescriptionBox from "@/components/DescriptionBox";
import CreatorBadge from "@/components/CreatorBadge";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${video.category.toLowerCase()}`}
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {video.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-semibold truncate max-w-[24rem]">Now Watching</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800">
          <VideoPlayer videoId={video.ytId} className="w-full rounded-none" />

          <div className="p-6 md:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40">
                {video.category}
              </Badge>
              <Badge variant="outline" className="border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300">
                {video.duration}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
              {video.title}
            </h1>

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Views</p>
                    <p className="font-semibold">{video.views.toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
                  <p className="font-semibold">{video.date}</p>
                </div>

                <div className="bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Video ID</p>
                  <p className="font-semibold">#{video.id}</p>
                </div>
              </div>

              <ActionRibbon videoId={video.id} initialLikes={Math.floor(video.views * 0.05)} />
            </div>

            <div className="py-6 border-y border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center mb-6">
              <CreatorBadge />
              <Button variant="destructive" className="rounded-full shadow-md font-bold px-8 shadow-red-500/20 hover:shadow-red-500/40 w-full sm:w-auto transition-all">
                Subscribe
              </Button>
            </div>

            <div className="mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">About This Video</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Description, context, and tags</p>
            </div>
            <DescriptionBox description={video.desc} tags={video.tags} />
          </div>
        </div>

        <CommentSection videoId={id} />
      </div>

      <aside className="xl:col-span-1 space-y-4">
        <div className="sticky top-24 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-4 md:p-5">
          <div className="mb-4 border-b border-gray-100 dark:border-zinc-800 pb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Up Next</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Recommended videos in the same category</p>
          </div>

          <div className="flex flex-col gap-3">
            {relatedVideos.map((v) => (
              <VideoCard key={v.id} video={v} layout="row" />
            ))}
          </div>
        </div>
      </aside>
      </div>
    </div>
  );
}
