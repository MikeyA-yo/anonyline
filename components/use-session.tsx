"use client";

import { Models } from "appwrite";
import { useEffect, useState } from "react";



const useClientSession = ()=>{
    const [user, setUser] = useState<Models.User<Models.Preferences>>();
    useEffect(()=>{
      async function getUser (){
        const res = await fetch (`/api/session`);
        if (res.ok){
            const user = await res.json();
            setUser(user)
        }
      }
      getUser()
    },[]);
    return user
}

export {useClientSession};