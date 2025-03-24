"use client";
import { createClient } from "@/app/supabase_config/client";
import useAPI from "./useapi";
import { useEffect} from "react";

const useRooms = () => {
  const { res: Rooms, error, loading, run } = useAPI("rooms");
  const supabase = createClient();
    useEffect(() => {
     supabase.channel("room").on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, (payload) => {
      run("rooms", "GET");
     }).subscribe();
      
  }, []);
  return { Rooms, error, loading, run };
};

export default useRooms;
