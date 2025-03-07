import { Models } from "node-appwrite";
import ChatMenu, { ChatMenuMobile } from "./chat-bar-menu";

export default async function SideBar({rooms}:{rooms:Models.DocumentList<Models.Document>}){
  
    return (
        <>
          <nav className="sticky lg:block h-screen md:block hidden overflow-y-auto overflow-x-hidden p-4 bg-[#2E073F]">
            <ChatMenu rooms={rooms.documents} />
          </nav>
          <div className="lg:hidden md:hidden block">
            <ChatMenuMobile rooms={rooms.documents} />
          </div>
        </>
    )
}