
import { User } from "@supabase/supabase-js";
import ChatMenu, { ChatMenuMobile } from "./chat-bar-menu";
import { Room } from "./types/room";

export default async function SideBar({rooms, user}:{rooms:Room[], user:User}){
  
    return (
        <>
          <nav className="sticky lg:block h-screen md:block hidden overflow-y-auto overflow-x-hidden p-4 bg-[#2E073F]">
            <ChatMenu rooms={rooms} user={user} />
          </nav>
          <div className="lg:hidden md:hidden block">
            <ChatMenuMobile rooms={rooms} user={user} />
          </div>
        </>
    )
}