import { listRooms } from "@/components/db";
import Find from "@/components/find";
import { getSafeUser } from "@/components/getUser";
import { redirect } from "next/navigation";

export default async function Page(){
   const user = await getSafeUser();
   console.log(user, !user)
   if (!user?.data.user) return redirect("/login");
   const rooms = await listRooms();
    return (
        <>
          <Find user={user.data.user} rooms={rooms}/>
        </>
    )
}