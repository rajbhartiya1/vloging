import ParallaxHero from "@/components/ParallaxHero";
import MilestoneTimeline from "@/components/MilestoneTimeline";
import EquipmentGearList from "@/components/EquipmentGearList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      <ParallaxHero />

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-zinc-800 -mt-24 relative z-20 mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">The Mission</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          <p>
            I started this journey with a simple point-and-shoot camera and a desire to capture memories. 
            What began as a personal diary quickly grew into a community of over a million like-minded adventurers, 
            tech enthusiasts, and dreamers.
          </p>
          <p>
            My goal is simple: <strong>To inspire you to live more, learn more, and enjoy life!</strong> Whether that's through exploring a hidden alley in Tokyo, reviewing the latest gadgets that make our lives easier, or sharing the behind-the-scenes struggles of being a creator.
          </p>
        </div>

        <blockquote className="border-l-4 border-indigo-500 pl-6 py-4 italic text-2xl font-medium text-gray-800 dark:text-gray-200 mb-8 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-r-2xl">
          "Life's too short for boring content. We're here to make every frame count."
        </blockquote>

        <div className="flex flex-wrap gap-4 mt-8">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-1">
            Work With Me <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="space-y-24">
        <MilestoneTimeline />
        <EquipmentGearList />
      </div>
    </div>
  );
}
