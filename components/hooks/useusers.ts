"use client";

import {
  client,
  databaseId,
  userId,
} from "@/app/appwrite_config/appwriteConfig";
import useAPI from "./useapi";
import { useEffect, useRef } from "react";
const useUsers = () => {
  const { res: Users, error, loading, run } = useAPI("users");
  const effectRef = useRef(false);
  useEffect(() => {
    let unsubscribe: () => void | undefined;
    if (!effectRef.current) {
      effectRef.current = true;
      const channel = `databases.${databaseId}.collections.${userId}.documents`;
      unsubscribe = client.subscribe([channel], (res) => {
        console.log(res);
      });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return { Users, error, loading, run };
};
export default useUsers;