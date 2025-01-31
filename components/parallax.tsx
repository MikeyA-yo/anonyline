"use client";
import { useState, useEffect } from "react";
import { AnimateDiv } from "./nav";
export default function Parallax({children}:{children:React.ReactNode}){
    const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(offset)
    return (
        <>
          {children}
        </>
    )
}