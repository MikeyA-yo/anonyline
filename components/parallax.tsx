"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Parallax({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Use pixel values instead of percentages
  const y1 = useTransform(scrollYProgress, [0, 1], ["0", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0", "-100%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0", "-150%"]);

  return (
    <div className="relative h-[300vh] " ref={ref}>
      <div className="sticky top-0 h-screen flex items-center justify-center bg-neutral-900">
        {/* Use motion.div directly */}
        <motion.div 
          className="absolute text-4xl text-white z-20"
          style={{ y: y1 }}
        >
          <p>Created for the purpose of back and forth 2 or multi way communication, rather than Just a one way mode</p>
        </motion.div>
        
        <motion.div 
          className="absolute text-4xl text-white z-30"
          style={{ y: y2 }}
        >
          <p>A simple Chat is all it is, but with the purpose of anonymity to allow users feel as free</p>
        </motion.div>
        
        <motion.div 
          className="absolute text-4xl text-white z-40"
          style={{ y: y3 }}
        >
          <p>Enhanced features for multi way chatting such as the concept of a room</p>
        </motion.div>
        
        {children}
      </div>
    </div>
  );
}