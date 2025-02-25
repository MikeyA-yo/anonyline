"use client";

import {
  client,
  databaseId,
  roomId,
} from "@/app/appwrite_config/appwriteConfig";
import useAPI from "./useapi";
import { useEffect, useRef } from "react";

const useRooms = () => {
  const { res: Rooms, error, loading, run } = useAPI("rooms");
  const effectRef = useRef(false);
    useEffect(() => {
     let unsubscribe: () => void | undefined;   
    if (!effectRef.current) {
      effectRef.current = true;
      const channel = `databases.${databaseId}.collections.${roomId}.documents`;
      console.log(channel, "About to subscribe");
      unsubscribe = client.subscribe([channel], (res) => {
        console.log(res);
        if (res) {
          run("rooms", "GET"); // Re-fetch rooms when data changes
        }
      });
    }
      return () => {
       if(unsubscribe) unsubscribe(); // Cleanup function to prevent memory leaks
      };
  }, []);
  return { Rooms, error, loading, run };
};

export default useRooms;
