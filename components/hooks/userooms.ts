"use client";

import { client, databaseId, roomId } from "@/app/appwrite_config/appwriteConfig";
import useAPI from "./useapi";
import { useEffect } from "react";

const useRooms = ()=>{
    const {res:Rooms, error, loading, run} = useAPI("rooms");
    console.log(process.env)
    useEffect(() => {
        const channel = `databases.${databaseId}.collections.${roomId}.documents`;
    
        const unsubscribe = client.subscribe(channel, (res) => {
            console.log(res)
          if (res.payload) {
            run("rooms", "GET"); // Re-fetch rooms when data changes
          }
        });
    
        return () => {
          unsubscribe(); // Cleanup function to prevent memory leaks
        };
      }, [Rooms]);
    return {Rooms, error, loading, run};
}

export default useRooms;