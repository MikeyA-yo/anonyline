import SideBar from "@/components/chat-sidebar";
import { redirect } from "next/navigation";
import { getSafeUser } from "@/components/getUser";
import "@/components/css/scroll.css";
import { Metadata } from "next";
import { rooms } from "@/components/db";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with people",
};

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSafeUser();
  if (!user?.data.session?.user) redirect("/login");
  const room = await rooms(user.data.session.user)
  return (
    <main className="flex">
      <SideBar rooms={room} user={user.data.session.user}/>
      {children}
    </main>
  );
}
