"use client";

import { motion } from "motion/react";
import { AnimateDiv } from "./nav";


export default function Hero() {
  return (
    <>
      <div className="text-center px-4 flex flex-col items-center justify-center gap-5  h-[100svh]">
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
          className="z-10"
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
          className="z-10"
        >
          <p className="font-mono text-[#EBD3F8] text-lg">
            Anonyline allows a 2 way communication anonymously
          </p>
        </AnimateDiv>
        <div className="flex gap-2 z-10">
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
            whileHover={{
              scale:0.85,
              transition:{
                duration:0.2,
                delay:0
              }
            }}
            onClick={()=>{
              window.location.pathname = "/login"
            }}
            className="bg-[#AD49E1] text-[#EBD3F8] hover:scale-75 px-4 py-2 rounded-lg"
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
            whileHover={{
              scale:0.85,
              transition:{
                duration:0.2,
                delay:0
              }
            }}
            className="bg-[#AD49E1] text-[#EBD3F8] px-4 py-2 rounded-lg"
            onClick={()=>{ document.querySelector("#about")?.scrollIntoView({behavior:"smooth"})}}
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </>
  );
}
