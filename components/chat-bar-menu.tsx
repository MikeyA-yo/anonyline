"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FaPlusCircle, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AnimateDiv } from "./nav";
import { AnimatePresence } from "motion/react";
import useRooms from "./hooks/userooms";
import { Room } from "./types/room";
import { User } from "@supabase/supabase-js";

function CMenu({ rooms, user }: { rooms: Room[], user: User }) {
  const {Rooms} = useRooms();
  const [roomList, setRoomList] = useState(rooms);
  console.log(rooms)
  useEffect(()=>{
    if (Rooms && Rooms.length != roomList && user.id){
      setRoomList([...Rooms.filter((v: Room) => v.members?.includes(user?.id)  || v.owner === user.id)])
    }
  }, [Rooms, roomList.length])
  return (
    <>
      {/* Private Individual Menu */}
      <Link href={"/chat/"} className="bg-[#7A1CAC] p-2 rounded-full transition-all duration-500 ease-linear  hover:rounded-md my-4  h-10 w-10 flex items-center justify-center">
        <FaUser />
      </Link>
      {/* Room menu */}
      <div className="flex flex-col gap-4">
        {roomList.map((v, i) => (
          <Link 
            href={`/chat/${v.name}`}
            key={i}
            className="bg-[#7A1CAC] p-1 rounded-full transition-all duration-75 ease-in-out  hover:rounded-md h-10 w-10 flex items-center justify-center"
          >
            {!v.image && <FaUserGroup />}
            {v.image && <img src={v.image} alt={v.name} className="h-full w-full rounded-full hover:rounded-md" />}
          </Link>
        ))}
        {/* Menu for creating a room */}
        <Link href={`/chat/find`} className="bg-[#7A1CAC] p-1 rounded-full transition-all duration-500 ease-linear  hover:rounded-md cursor-pointer my-4  h-10 w-10 flex items-center justify-center">
          <FaPlusCircle />
        </Link>
      </div>
    </>
  );
}

export default function ChatMenu({ rooms, user }: { rooms: Room[] , user: User}) {
  return (
    <>
      {/* <div className="lg:block md:block h-full overflow-x-hidden hidden"> */}
        <CMenu rooms={rooms} user={user} />
      {/* </div> */}
    </>
  );
}

export function ChatMenuMobile({ rooms, user }: { rooms: Room[], user: User }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav
        className="fixed m-2 p-2 z-20 bg-[#2E073F] rounded-full cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {!open && <BiMenu className="h-8 w-8 fill-[#EBD3F8]" />}
        {open && <BiX className="h-8 w-8 fill-[#EBD3F8]" />}
      </nav>
      <AnimatePresence>
        {open && (
          <AnimateDiv
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              type: "spring",
              bounce: 0.3,
            }}
            className="sticky h-full bg-[#2E073F] p-2 z-10"
          >
            <div className="flex py-10 flex-col items-center h-full">
              <CMenu rooms={rooms} user={user} />
            </div>
          </AnimateDiv>
        )}
      </AnimatePresence>
    </>
  );
}
