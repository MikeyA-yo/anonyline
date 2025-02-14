import SideBar from "@/components/chat-sidebar";
import { redirect } from "next/navigation"
import { getSafeUser } from "@/components/getUser"

export default  async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSafeUser();
   if (!user) return redirect("/login");
  return (
    <main className="flex">
      <SideBar />
      {children}
    </main>
  );
}
