import { getVideosByCategory, getCategoryBySlug } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const videos = getVideosByCategory(slug);

  return (
    <div className="space-y-8">
      <div className="bg-indigo-50 p-8 rounded-3xl text-center border border-indigo-100 mb-8">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">{category.name} Vlogs</h1>
        <p className="text-indigo-600">Explore the best videos in the {category.name} category.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.length > 0 ? (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center py-12">No videos found in this category.</p>
        )}
      </div>
    </div>
  );
}
