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
  if (!user) return redirect("/login");
  const col = await rooms(user);
  return (
    <main className="flex">
      <SideBar rooms={col} />
      {children}
    </main>
  );
}
