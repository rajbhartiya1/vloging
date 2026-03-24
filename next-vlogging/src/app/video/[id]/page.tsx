import { getVideoById, getRelatedVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import CommentSection from "@/components/CommentSection";
import VideoPlayer from "@/components/VideoPlayer";
import ActionRibbon from "@/components/ActionRibbon";
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

  const relatedVideos = getRelatedVideos(video.category, video.id, 4);

  return (
    <div className="space-y-12 pb-12">
      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl dark:shadow-none dark:border dark:border-zinc-800">
        <VideoPlayer videoId={video.ytId} className="w-full rounded-none" />
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">{video.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 dark:border-zinc-800 pb-8">
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 font-medium">
              <span className="flex items-center gap-1.5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {video.views.toLocaleString()} views
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
              <Badge variant="secondary" className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50">
                {video.category}
              </Badge>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"></span>
              <span>{video.date}</span>
            </div>
            
            <ActionRibbon videoId={video.id} initialLikes={12450} />
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mb-8 whitespace-pre-wrap">
            {video.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
             {video.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-sm border-gray-200 dark:border-zinc-800">#{tag}</Badge>
             ))}
          </div>
          <Button variant="destructive" size="lg" className="rounded-full shadow-lg hover:shadow-red-500/25 hover:-translate-y-0.5 transition-all w-full md:w-auto">
            Subscribe for More!
          </Button>
        </div>
      </div>

      <CommentSection videoId={id} />

      <section>
        <h2 className="text-2xl font-bold mb-6">Related Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>
    </div>
  );
}
