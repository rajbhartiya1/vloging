"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What camera do you use for your vlogs?",
      a: "I primarily use the Sony A7S III with a 16-35mm G-Master lens for my main studio and cinematic shots. For on-the-go travel vlogging, I stick to the DJI Osmo Pocket 3 because of its incredible stabilization and compact size.",
    },
    {
      q: "Do you accept brand sponsorships?",
      a: "Yes! I am always open to working with brands that align with my audience's interests (tech, travel, and lifestyle). Please use the contact form and select 'Brand Collaboration' to get in touch.",
    },
    {
      q: "Can I use your videos in my compilation/reaction video?",
      a: "You may use short clips (under 10 seconds) for transformative, educational, or reaction content under Fair Use, as long as you credit the channel and link back to the original video.",
    },
    {
      q: "How often do you upload new videos?",
      a: "I aim for a strict schedule of two videos a week. Usually on Tuesdays and Fridays. I also sprinkle in YouTube Shorts throughout the week.",
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
      {faqs.map((faq, idx) => (
        <div 
          key={idx} 
          className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/50 transition-colors"
        >
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
          >
            {faq.q}
            <ChevronDown 
              size={20} 
              className={cn(
                "text-gray-500 transition-transform duration-300",
                openIndex === idx && "rotate-180"
              )} 
            />
          </button>
          
          <div 
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              openIndex === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
