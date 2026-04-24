
"use client";
import Link from "next/link";
import { getLatestVideos, getTrendingVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";
import HeroSlider from "@/components/HeroSlider";
import CreatorBadge from "@/components/CreatorBadge";
import CategoryPills from "@/components/CategoryPills";
import NewsletterSignup from "@/components/NewsletterSignup";
import { motion, type Variants } from "framer-motion";

export default function Home() {
  const latestVideos = getLatestVideos(6);
  const trendingVideos = getTrendingVideos(6);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.85 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 150,
        damping: 12
      } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-16 pb-24 md:pb-12"
    >
      {/* Featured Hero Carousel section */}
      <motion.section variants={itemVariants} className="max-w-[1400px] mx-auto px-4 w-full">
        <HeroSlider />
      </motion.section>

      {/* Creator Badge (Inline Bio) */}
      <motion.section variants={itemVariants} className="max-w-3xl mx-auto md:-mt-12 relative z-10 px-4">
        <CreatorBadge />
      </motion.section>

      {/* Filter Pills */}
      <motion.section variants={itemVariants} className="max-w-6xl mx-auto px-4">
        <h2 className="sr-only">Filter by Category</h2>
        <CategoryPills />
      </motion.section>

      {/* Latest Vlogs */}
      <motion.section variants={itemVariants} className="px-4 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">Latest Drops</h2>
            <p className="text-gray-500 font-medium mt-2">Fresh content just for you.</p>
          </div>
          <Link href="/category/lifestyle" className="group flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-full font-bold transition-all transform hover:scale-105">
            View All 
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {latestVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </motion.section>

      {/* Trending */}
      <motion.section variants={itemVariants} className="px-4 max-w-7xl mx-auto w-full">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-gray-100 flex items-center justify-center md:justify-start gap-3">
            Trending Now <span className="inline-block animate-bounce text-4xl mt-1">🔥</span>
          </h2>
          <p className="text-gray-500 font-medium mt-2">What everyone is watching right now.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
