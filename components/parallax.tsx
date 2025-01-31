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
  const y1 = useTransform(scrollYProgress, [0, 1], ["0", "-250%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0", "-500%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0", "-750%"]);

  return (
    <div className="relative h-[300vh] overflow-hidden" ref={ref}>
      <div className="sticky top-0 h-screen flex items-center justify-center bg-neutral-900">
        {/* Use motion.div directly */}
        <motion.div 
          className="absolute text-4xl text-white z-30"
          style={{ y: y1 }}
        >
          <p>First Layer</p>
        </motion.div>
        
        <motion.div 
          className="absolute text-4xl text-white z-20"
          style={{ y: y2 }}
        >
          <p>Second Layer</p>
        </motion.div>
        
        <motion.div 
          className="absolute text-4xl text-white z-10"
          style={{ y: y3 }}
        >
          <p>Third Layer</p>
        </motion.div>
        
        {children}
      </div>
    </div>
  );
}