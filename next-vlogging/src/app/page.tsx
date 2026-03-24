
"use client";
import Link from "next/link";
import { getLatestVideos, getTrendingVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import HeroSlider from "@/components/HeroSlider";
import CreatorBadge from "@/components/CreatorBadge";
import CategoryPills from "@/components/CategoryPills";
import NewsletterSignup from "@/components/NewsletterSignup";
import { motion } from "framer-motion";

export default function Home() {
  const latestVideos = getLatestVideos(6);
  const trendingVideos = getTrendingVideos(6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-16 pb-24 md:pb-12"
    >
      {/* Featured Hero Carousel section */}
      <motion.section variants={itemVariants}>
        <HeroSlider />
      </motion.section>

      {/* Creator Badge (Inline Bio) */}
      <motion.section variants={itemVariants} className="max-w-2xl mx-auto md:-mt-8 relative z-10 px-4">
        <CreatorBadge />
      </motion.section>

      {/* Filter Pills */}
      <motion.section variants={itemVariants} className="max-w-6xl mx-auto px-4">
        <h2 className="sr-only">Filter by Category</h2>
        <CategoryPills />
      </motion.section>

      {/* Latest Vlogs */}
      <motion.section variants={itemVariants} className="px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 text-gray-900 border-none dark:text-gray-100">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Latest Vlogs</h2>
          <Link href="/category/lifestyle" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 text-sm md:text-base">
            View All <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </motion.section>

      {/* Trending */}
      <motion.section variants={itemVariants} className="px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          Trending Now <span className="text-2xl">??</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section variants={itemVariants} className="px-4 max-w-6xl mx-auto">
        <NewsletterSignup />
      </motion.section>
    </motion.div>
  );
}
