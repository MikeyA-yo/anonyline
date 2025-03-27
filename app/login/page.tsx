import Login from "@/components/login";
import { Metadata } from "next";
import { redirect } from "next/navigation"
import { getSafeUser } from "@/components/getUser"

export const metadata:Metadata = {
    title: "Login"
}

export default async function Page(){
    const user = await getSafeUser();
    if (user?.data.session?.user) return redirect("/chat");
    return (
        <>
         <Login />
        </>
    )
}