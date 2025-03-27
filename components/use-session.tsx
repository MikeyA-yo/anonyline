"use client";

import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";



const useClientSession = ()=>{
    const [user, setUser] = useState<User>();
    useEffect(()=>{
      async function getUser (){
        const res = await fetch (`/api/session`);
        if (res.ok){
            const user = await res.json();
            if (user.data?.session?.user){
              setUser(user.data.session.user)
            }
        }
      }
      getUser()
    },[]);
    return user
}

export {useClientSession};