import { redirect } from "next/navigation"
import { getSafeUser } from "./getUser"
export default async function SideBar(){
  const user = await getSafeUser();
   if (!user) return redirect("/login");
    return (
        <>
          <nav className="fixed h-screen overflow-auto"></nav>
        </>
    )
}