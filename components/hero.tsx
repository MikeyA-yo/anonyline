"use client";

import { motion } from "motion/react";
import { AnimateDiv } from "./nav";

export default function Hero() {
  return (
    <>
      <div className="bg-gradient-to-b  text-center px-4 flex flex-col items-center justify-center gap-5 from-[#2E073F] to-[#7A1CAC] h-[100svh]">
        <AnimateDiv
          initial={{
            y: "-10vh",
            opacity: 0.2,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
          }}
        >
          <h2 className="lg:text-3xl text-2xl bg-gradient-to-r font-extrabold from-[#AD49E1] to-[#EBD3F8] text-transparent bg-clip-text">
            Enjoy seamless anonymous chat with Anonyline
          </h2>
        </AnimateDiv>
        <AnimateDiv
          initial={{
            y: "10vh",
            opacity: 0.1,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          <p className="font-mono text-[#EBD3F8] text-lg">
            Anonyline allows a 2 way communication anonymously
          </p>
        </AnimateDiv>
        <div className="flex gap-2">
          <motion.button
            initial={{
              scale: 0.6,
              y: "12vh",
              opacity: 0.2,
            }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.2,
            }}
            className="bg-[#AD49E1] text-[#EBD3F8] px-4 py-2 rounded-lg"
          >
            Get Started
          </motion.button>
          <motion.button
            initial={{
              scale: 0.6,
              y: "12vh",
              opacity: 0.1,
            }}
            animate={{
              scale: 1,
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.4,
            }}
            className="bg-[#AD49E1] text-[#EBD3F8] px-4 py-2 rounded-lg"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </>
  );
}
