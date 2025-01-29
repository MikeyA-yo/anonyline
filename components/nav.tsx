"use client";
import Link from "next/link";
import { useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

export default function Nav(){
    const [open, setOpen] = useState(false);
    return (
        <>
          <nav className="backdrop-blur-md lg:flex md:flex hidden items-center shadow-sm shadow-[#7A1CAC] justify-evenly w-full fixed p-5 text-white">
            <Link href={"/"} className="text-xl font-bold">AnonyLine..</Link>
            <div className="p-3 border-[0.5px] border-[#FFFBFF] bg-[#FBFFFF] bg-opacity-10 backdrop-blur-md rounded-full flex gap-3">
                <Link href={"/about"}>About</Link>
                <Link href={"/features"}>Features</Link>
                <Link href={"/contact"}>Contact</Link>
            </div>
            <Link href={"/login"}>Login</Link>
          </nav>
          <nav className="lg:hidden md:hidden fixed w-full flex items-center text-white p-3 backdrop-blur-md justify-between">
            <Link href={"/"} className="text-xl font-bold">AnonyLine..</Link>
            <Bar open={open} setOpen={setOpen} />
          </nav>
        </>
    )
}
function SideBar({}){
    return (
        <></>
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