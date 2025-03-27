"use client";
import { createClient } from "@/app/supabase_config/client";
import useAPI from "./useapi";
import { useEffect} from "react";

const useChat = (id: number) => {
  const {res:chats, error,loading, run} = useAPI(`chat?room=${id}`);
  const supabase = createClient();
  useEffect(() => {
   supabase.channel("chat").on("postgres_changes", { event: "*", schema: "public", table: "chats" }, (payload) => {
    run(`chat?room=${id}`, "GET");
    console.log(payload)
   }).subscribe();
  }, []);
  return {chats, error,loading};
}

export default useChat;