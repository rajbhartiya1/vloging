import { getVideosByCategory, getCategoryBySlug, categories } from "@/lib/data";
import { notFound } from "next/navigation";
import CategoryContent from "@/components/CategoryContent";

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

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

  const bgGradients: Record<string, string> = {
    lifestyle: "from-pink-100 to-rose-100 dark:from-pink-950/30 dark:to-rose-950/30",
    travel: "from-cyan-100 to-sky-100 dark:from-cyan-950/30 dark:to-sky-950/30",
    tech: "from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30",
    food: "from-orange-100 to-amber-100 dark:from-orange-950/30 dark:to-amber-950/30",
    gaming: "from-purple-100 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/30",
  };
  const bgGrad = bgGradients[slug] || "from-gray-100 to-slate-100 dark:from-zinc-900 dark:to-zinc-800";

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-6">
      <div className={"relative bg-gradient-to-br ${bgGrad} p-10 md:p-16 rounded-[2.5rem] text-center border border-white/50 dark:border-zinc-800 shadow-sm overflow-hidden mb-12"}>
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-sm capitalize">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium">
            Explore the best viewing experiences, vlogs, and adventures in {category.name}.
          </p>
        </div>
      </div>
      <CategoryContent initialVideos={videos} categoryName={category.name} />
    </div>
  );
}
