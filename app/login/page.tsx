import Login from "@/components/login";
import { Metadata } from "next";
// import { redirect } from "next/navigation"
// import { getSafeUser } from "@/components/getUser"
export const metadata:Metadata = {
    title: "Login"
}
export default async function Page(){
    return (
        <>
         <Login />
        </>
    )
}