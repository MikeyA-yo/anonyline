import Login from "@/components/login";
import { Metadata } from "next";
export const metadata:Metadata = {
    title: "Login"
}
export default function Page(){
    return (
        <>
         <Login />
        </>
    )
}