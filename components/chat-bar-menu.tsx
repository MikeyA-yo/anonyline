"use client";
import Link from "next/link";
import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FaPlusCircle, FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { AnimateDiv } from "./nav";
import { AnimatePresence } from "motion/react";
import useRooms from "./hooks/userooms";

function CMenu({ roomsId }: { roomsId: string[] }) {
  const {Rooms, error, loading} = useRooms();
  return (
    <>
      {/* Private Individual Menu */}
      <div className="bg-[#7A1CAC] p-2 rounded-full transition-all duration-500 ease-linear  hover:rounded-md my-4  h-12 w-12 flex items-center justify-center">
        <Link href={"/chat/"}>
          <FaUser />
        </Link>
      </div>
      {/* Room menu */}
      <div className="flex flex-col gap-4">
        {roomsId.map((v, i) => (
          <div
            key={i}
            className="bg-[#7A1CAC] p-2 rounded-full transition-all duration-75 ease-in-out  hover:rounded-md h-12 w-12 flex items-center justify-center"
          >
            <Link href={`/chat/${v}`}>
              <FaUserGroup />
            </Link>
          </div>
        ))}
        {/* Menu for creating a room */}
        <div className="bg-[#7A1CAC] p-2 rounded-full transition-all duration-500 ease-linear  hover:rounded-md cursor-pointer my-4  h-12 w-12 flex items-center justify-center">
          <Link href={`/chat/find`}>
            {" "}
            <FaPlusCircle />
          </Link>
        </div>
      </div>
    </>
  );
}

export default function ChatMenu({ roomsId }: { roomsId: string[] }) {
  return (
    <>
      <div className="lg:block md:block h-full overflow-auto hidden">
        <CMenu roomsId={roomsId} />
      </div>
    </>
  );
}

export function ChatMenuMobile({ roomsId }: { roomsId: string[] }) {
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
            className="fixed h-full bg-[#2E073F] p-2 z-10"
          >
            <div className="flex py-10 flex-col items-center h-full">
              <CMenu roomsId={roomsId} />
            </div>
          </AnimateDiv>
        )}
      </AnimatePresence>
    </>
  );
}
