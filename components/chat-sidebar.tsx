
import ChatMenu, { ChatMenuMobile } from "./chat-bar-menu";
import { Room } from "./types/room";

export default async function SideBar({rooms}:{rooms:Room[]}){
  
    return (
        <>
          <nav className="sticky lg:block h-screen md:block hidden overflow-y-auto overflow-x-hidden p-4 bg-[#2E073F]">
            <ChatMenu rooms={rooms} />
          </nav>
          <div className="lg:hidden md:hidden block">
            <ChatMenuMobile rooms={rooms} />
          </div>
        </>
    )
}