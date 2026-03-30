"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const featuredVlogs = [
  {
    id: "f1",
    title: "Exploring the Secret Temples of Kyoto",
    category: "Travel",
    duration: "14:20",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=80",
    gradient: "from-indigo-900/80 via-black/50 to-transparent"
  },
  {
    id: "f2",
    title: "My Ultimate Desk Setup 2026",
    category: "Tech",
    duration: "08:45",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1600&q=80",
    gradient: "from-slate-900/90 via-black/50 to-transparent"
  },
  {
    id: "f3",
    title: "A Day in the Life: Minimalist Living",
    category: "Lifestyle",
    duration: "11:10",
    image: "https://images.unsplash.com/photo-1449247666642-264389f5f5b1?w=1600&q=80",
    gradient: "from-emerald-900/80 via-black/50 to-transparent"
  }
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group w-full rounded-[2rem] overflow-hidden shadow-2xl mb-8 bg-black border border-white/10 mt-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {featuredVlogs.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0">
              <div className="w-full aspect-[16/9] md:aspect-[21/9] relative flex items-center">
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill 
                  priority={index === 0}
                  className="object-cover transform transition-transform duration-[10000ms] scale-105 group-hover:scale-100" 
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} pointer-events-none`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                <div className="relative z-10 px-6 md:px-16 w-full md:w-2/3 pt-12 md:pt-0">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: selectedIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-3 py-1 text-xs md:text-sm shadow-xl" variant="secondary">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                      {slide.category}
                    </Badge>
                    <h2 className="text-3xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tighter drop-shadow-2xl">
                      {slide.title}
                    </h2>
                    <p className="text-gray-300 md:text-lg mb-8 max-w-xl line-clamp-2 md:line-clamp-none font-medium text-sm drop-shadow-md">
                      Join me on this incredible journey. Experience the culture, the tech, and the breathtaking visuals in stunning 4K.
                    </p>
                    <div className="flex items-center gap-4">
                      <Link href={`/video/${slide.id}`}>
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-bold px-6 py-6 sm:px-8 sm:py-7 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all flex gap-2 text-md sm:text-lg">
                           <Play fill="black" size={24} /> Watch Now
                        </Button>
                      </Link>
                      <Button asChild variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-full font-bold px-6 py-6 sm:py-7 backdrop-blur-md shadow-lg transition-all flex gap-2 border border-white/10">
                        <Link href={`/video/${slide.id}`}>
                          <Info size={24} /> Details
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination / Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {featuredVlogs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`transition-all duration-500 rounded-full ${
              selectedIndex === idx 
                ? "w-8 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
