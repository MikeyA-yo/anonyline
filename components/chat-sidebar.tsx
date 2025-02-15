import { Models } from "node-appwrite";
import ChatMenu from "./chat-bar-menu";

export default async function SideBar({rooms}:{rooms:Models.DocumentList<Models.Document>}){
  
    return (
        <>
          <nav className="fixed h-screen overflow-auto p-5 bg-[#2E073F]">
            <ChatMenu roomsId={rooms.documents.map( v => v.$id)} />
          </nav>
        </>
    )
}