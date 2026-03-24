"use client";

import { motion } from "framer-motion";
import { Calendar, Video, Award, PlaySquare } from "lucide-react";

export default function MilestoneTimeline() {
  const milestones = [
    {
      year: "2019",
      title: "The First Vlog",
      description: "Uploaded an unedited video of a weekend hike. It got 50 views, but I instantly fell in love with the process.",
      icon: <Video size={20} />,
      color: "bg-blue-500",
    },
    {
      year: "2021",
      title: "10K Subscribers",
      description: "Hit the first major milestone! Celebrating the community growth with the highly requested Q&A video.",
      icon: <PlaySquare size={20} />,
      color: "bg-indigo-500",
    },
    {
      year: "2023",
      title: "Full-Time Creator",
      description: "Made the leap to leave the 9-5 and dedicate my life entirely to storytelling and video production.",
      icon: <Calendar size={20} />,
      color: "bg-purple-500",
    },
    {
      year: "2026",
      title: "VlogHub Launch",
      description: "Releasing my own self-hosted platform to get closer to the community with tailored content and direct support.",
      icon: <Award size={20} />,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">Channel History</h2>
      
      <div className="relative border-l-2 border-gray-200 dark:border-zinc-800 ml-4 md:ml-6 space-y-12">
        {milestones.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-white dark:border-zinc-950 flex items-center justify-center text-white shadow-md ${item.color}`}>
              {item.icon}
            </div>
            
            {/* Content card */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 shadow-sm ${item.color}`}>
                {item.year}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
