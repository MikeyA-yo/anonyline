import SideBar from "@/components/chat-sidebar";
import { redirect } from "next/navigation";
import { getSafeUser } from "@/components/getUser";
import { rooms } from "@/components/db";
import { Metadata } from "next";
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
    if (!user?.data.session?.user) redirect("/login")
  return (
    <main className="flex">
      <SideBar rooms={[]} />
      {children}
    </main>
  );
}
