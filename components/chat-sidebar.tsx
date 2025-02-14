import ChatMenu from "./chat-bar-menu";

export default async function SideBar(){
  
    return (
        <>
          <nav className="fixed h-screen overflow-auto p-5 bg-[#2E073F]">
            <ChatMenu />
          </nav>
        </>
    )
}