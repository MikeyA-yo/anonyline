import ChatPage from "@/components/chat";
import { getSafeUser } from "@/components/getUser";

export default async function Chat(){
    const user  = await getSafeUser();
    if (!user?.data.session) return null
    return (
        <>
         <ChatPage user={user.data.session.user} />
        </>
    )
}