"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxTextEffect = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);

  // Create transformed values for different layers
  const y1 = useTransform(scrollY, [0, 1000], [0, -400], { clamp: false });
  const y2 = useTransform(scrollY, [0, 1000], [0, -200], { clamp: false });
  const y3 = useTransform(scrollY, [0, 1000], [0, -100], { clamp: false });

  return (
    <div ref={containerRef} className="h-[200vh] bg-neutral-900 overflow-x-hidden">
      {/* Front Layer (Fastest) */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-bold text-red-400 z-30"
      >
        Front Layer
      </motion.div>

      {/* Middle Layer */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl font-bold text-emerald-400 z-20"
      >
        Middle Layer
      </motion.div>

      {/* Back Layer (Slowest) */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-bold text-amber-400 z-10"
      >
        Back Layer
      </motion.div>
    </div>
  );
};
export default ParallaxTextEffect