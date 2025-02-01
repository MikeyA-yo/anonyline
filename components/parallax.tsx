"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Parallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    layersRef.current.forEach((layer, index) => {
      if (!layer) return;

      gsap.to(layer, {
        yPercent: -100 * (index + 1), // Stronger parallax effect
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          markers: true // Remove for production
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative h-[200vh] bg-neutral-900"
    >
      <div className="sticky h-screen">
        {/* Back Layer */}
        <div
          ref={el => {layersRef.current[0] = el}}
          className="absolute inset-0 flex items-center justify-center text-6xl text-amber-200 z-10"
        >
          Background
        </div>

        {/* Middle Layer */}
        <div
          ref={el => {layersRef.current[1] = el}}
          className="absolute inset-0 flex items-center justify-center text-7xl text-emerald-200 z-20"
        >
          Middle
        </div>

        {/* Front Layer */}
        <div
          ref={el => { layersRef.current[2] = el }}
          className="absolute inset-0 flex items-center justify-center text-8xl text-rose-200 z-30"
        >
          Foreground
        </div>
      </div>
    </div>
  );
}
// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// export default function Parallax({ children }: { children?: React.ReactNode }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"]
//   });

//   // Use pixel values instead of percentages
//   const y1 = useTransform(scrollYProgress, [0, 1], ["0", "-10%"]);
//   const y2 = useTransform(scrollYProgress, [0, 1], ["0", "-100%"]);
//   const y3 = useTransform(scrollYProgress, [0, 1], ["0", "-150%"]);

//   return (
//     <div className="relative h-[300vh] " ref={ref}>
//       <div className="sticky top-0 h-screen flex items-center justify-center bg-neutral-900">
//         {/* Use motion.div directly */}
//         <motion.div 
//           className="absolute text-4xl text-white z-20"
//           style={{ y: y1 }}
//         >
//           <p>Created for the purpose of back and forth 2 or multi way communication, rather than Just a one way mode</p>
//         </motion.div>
        
//         <motion.div 
//           className="absolute text-4xl text-white z-30"
//           style={{ y: y2 }}
//         >
//           <p>A simple Chat is all it is, but with the purpose of anonymity to allow users feel as free</p>
//         </motion.div>
        
//         <motion.div 
//           className="absolute text-4xl text-white z-40"
//           style={{ y: y3 }}
//         >
//           <p>Enhanced features for multi way chatting such as the concept of a room</p>
//         </motion.div>
        
//         {children}
//       </div>
//     </div>
//   );
// }