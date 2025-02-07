"use client";

// import { account } from "@/app/appwrite_config/appwriteConfig";
 import { Models } from "appwrite";
import { useEffect, useState } from "react";

// const useSession = () =>{
//     const [session, setSession] = useState<Models.Session>();
//     const storage = JSON.parse(window.sessionStorage.getItem("user")??"{}")
//     if (!storage.$id) return null;
//     useEffect(()=>{
//         async function getNSet(){
//             const ss = await account.getSession(storage.$id);
//             setSession(ss);
//         }
//         getNSet()
//     },[])
//     return session;
// }

const useLocalSession = ():Models.Session =>{
    return JSON.parse(window.sessionStorage.getItem("user")??"{}");
}

export {useLocalSession};