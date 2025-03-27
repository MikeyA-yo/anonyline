import ChatPage from "@/components/chat";
import { getSafeUser } from "@/components/getUser";
import { redirect } from "next/navigation";

export default async function Chat(){
    const user  = await getSafeUser();
    if (!user?.data.user) return redirect("/login")
    return (
        <>
         <ChatPage user={user.data.user} />
        </>
    )
}