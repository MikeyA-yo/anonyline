import SideBar from "@/components/chat-sidebar";

export default function ChatLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <main><SideBar />
                {children}</main>
                
    )
  }