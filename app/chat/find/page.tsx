import Find from "@/components/find";
import { getSafeUser } from "@/components/getUser";
import { redirect } from "next/navigation";

export default async function Page(){
  const user = await getSafeUser();
   if (!user) return redirect("/login");
    return (
        <>
          <Find user={user} />
        </>
    )
}