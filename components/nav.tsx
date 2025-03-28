"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { ScrollLink } from "./ay-scroll";
import { useClientSession } from "./use-session";
import { User } from "@supabase/supabase-js";

export default function Nav(){
    const [open, setOpen] = useState(false);
    const user = useClientSession();
    return (
        <>
          <nav className="backdrop-blur-md lg:flex md:flex hidden items-center shadow-sm shadow-[#7A1CAC] justify-evenly w-full fixed p-5 z-20 text-white">
            <Link href={"/"} className="text-xl font-bold">AnonyLine..</Link>
            <div className="p-3 border-[0.5px] border-[#FFFBFF] bg-[#FBFFFF] bg-opacity-10 backdrop-blur-md rounded-full flex gap-3">
                <ScrollLink href={"#about"}>About</ScrollLink>
                <ScrollLink href={"#features"}>Features</ScrollLink>
                <ScrollLink href={"#contact"}>Contact</ScrollLink>
            </div>
            <Link href={user?"/chat":"/login"}>{user ? "Chat": "Login"}</Link>
          </nav>
          <nav className="lg:hidden z-30 md:hidden fixed w-full flex items-center text-white p-3 backdrop-blur-md justify-between">
            <Link href={"/"} className="text-xl font-bold">AnonyLine..</Link>
            <Bar open={open} setOpen={setOpen} />
          </nav>
          <AnimatePresence>
                {open && <SideBar user={user} />}
            </AnimatePresence>
        </>
    )
}
export const AnimateDiv = motion.div;
function SideBar({user}:{user:User | undefined}){
    return (
        <>
          <AnimateDiv className="flex flex-col gap-3 pt-16 h-screen fixed backdrop-blur-md w-full text-white px-5 z-20" initial={{
                x: "100vw"
            }} animate={{
                x: "0vw"
          }}
            transition={{
                type: "spring",
                stiffness: 100
            }}
            exit={{
                x:"100vw"
            }}
          >
            <ScrollLink href={"#about"}>About</ScrollLink>
            <ScrollLink href={"#features"}>Features</ScrollLink>
            <ScrollLink href={"#contact"}>Contact</ScrollLink>
            <Link href={user ? "/chat":"/login"} className="text-center">{user ? "Chat": "Login"}</Link>
          </AnimateDiv>
        </>
    )
}
function Bar({open, setOpen}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    return (
        <>
        {!open && <HiBars3BottomRight className="fill-[#EBD3F8] h-8 w-8" onClick={()=>{
            setOpen(true)
        }}/>}
        {open && <MdClose className="fill-[#EBD3F8] h-8 w-8" onClick={()=>{ setOpen(false)}} />}
        </>
    )
}