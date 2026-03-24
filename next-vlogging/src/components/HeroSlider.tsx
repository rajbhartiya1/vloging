"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

// Mock data for featured slides
const featuredVlogs = [
  {
    id: "f1",
    title: "Exploring the Secret Temples of Kyoto",
    category: "Travel",
    duration: "14:20",
    image: "bg-indigo-900", // Placeholder for actual image
    gradient: "from-indigo-500/80 to-purple-900/80"
  },
  {
    id: "f2",
    title: "My Ultimate Desk Setup 2026",
    category: "Tech",
    duration: "08:45",
    image: "bg-blue-900",
    gradient: "from-blue-500/80 to-slate-900/80"
  },
  {
    id: "f3",
    title: "A Day in the Life: Minimalist Living",
    category: "Lifestyle",
    duration: "11:10",
    image: "bg-emerald-900",
    gradient: "from-emerald-500/80 to-teal-900/80"
  }
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <div className="relative group w-full rounded-3xl overflow-hidden shadow-2xl mb-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {featuredVlogs.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0">
              <div className={`w-full aspect-[16/9] md:aspect-[21/9] ${slide.image} relative flex items-center`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                <div className="absolute inset-0 bg-black/30 md:bg-black/10" />
                
                {/* Content */}
                <div className="relative z-10 px-6 md:px-16 w-full md:w-2/3">
                  <Badge className="mb-4" variant="secondary">{slide.category}</Badge>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-md">
                    {slide.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <Button className="bg-white text-black hover:bg-gray-100 rounded-full font-bold px-6 py-6 shadow-lg hover:scale-105 transition-transform flex gap-2">
                       <Play fill="black" size={20} /> Watch Now
                    </Button>
                    <span className="text-white/80 font-medium tracking-wide text-sm">{slide.duration} • Featured</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredVlogs.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}