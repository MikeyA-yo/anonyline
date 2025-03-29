import { revalidatePath } from "next/cache";
import { createClient } from "@/app/supabase_config/server";

export async function createChat(chat: string, from: string, roomId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .insert({ chat, from, room_id: roomId, seen: [from] })
    .select();
  if (error) return error;
  revalidatePath("/chat");
  return data[0];
}
export async function deleteChat(
  chatId: number,
  deleter: string,
  roomId: number
) {
  const supabase = await createClient();
  const { data: roomData } = await supabase
    .from("rooms")
    .select("owner")
    .eq("id", roomId)
    .single();

  const { data, error } = await supabase
    .from("chats")
    .delete()
    .eq("id", chatId)
    .eq("room_id", roomId)
    .or(`(from.eq.${deleter},owner.eq.${roomData?.owner})`)
    .select();
  if (!error) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      error,
    };
  }
}

export async function getChats(roomId: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .select()
    .eq("room_id", roomId);
    if (error) return [];
    return data
}

export async function editChat(chatId: number, update:any){
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .update(update)
    .eq("id", chatId)
    .select();
  if (error) return error;
  return data;
}
