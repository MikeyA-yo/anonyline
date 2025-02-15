import SideBar from "@/components/chat-sidebar";
import { redirect } from "next/navigation"
import { getSafeUser } from "@/components/getUser"
import { rooms } from "@/components/db";

export default  async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSafeUser();
   if (!user) return redirect("/login");
   const col = await rooms(user);
   console.log(col)
  return (
    <main className="flex">
      <SideBar rooms={col} />
      {children}
    </main>
  );
}
