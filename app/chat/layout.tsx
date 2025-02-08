import SideBar from "@/components/chat-sidebar";

export default function ChatLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <html lang="en">
            <body>
                <SideBar />
                {children}
            </body>
        </html>
    )
  }