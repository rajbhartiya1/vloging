"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[60vh] min-h-[400px] overflow-hidden rounded-[2.5rem] mb-16 shadow-xl"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-zinc-800"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200&h=800')] bg-cover bg-center mix-blend-overlay opacity-60" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <span className="bg-indigo-600 px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-lg mb-4 inline-block shadow-sm">
            Creator Story
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter drop-shadow-md">
            I'm Alex.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl text-balance drop-shadow-sm">
            Documenting the world, exploring tech, and living life to the fullest. Welcome to my creative universe.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
