"use client";
import { useState, useEffect } from "react";
import { AnimateDiv } from "./nav";
import { useScroll, useTransform } from "motion/react";
export default function Parallax({children,}:{children:React.ReactNode}){
    return (
       <AnimateDiv className="h-screen sticky flex items-center justify-center" 
       >
        {children}
       </AnimateDiv>
    )
}