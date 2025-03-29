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
  return data;
}

export async function editChat(chatId: number, update: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chats")
    .update(update)
    .eq("id", chatId)
    .select();
  if (error) return error;
  console.log(data);
  return data;
}

export async function removeLastSeenPoint(roomId: number, userId: string) {
  const supabase = await createClient();
  const chats = await getChats(roomId);
  const update = [];
  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i];
    let seen = chat.seen || [];
    if (seen.includes(userId)) {
      seen = seen.filter((seenUser: string) => seenUser !== userId);
      chat.seen = seen;
      update.push(chat);
    }
  }
  console.log(update);
  const { data, error } = await supabase
    .from("chats")
    .upsert(update)
    .eq("room_id", roomId)
    .select();
  if (error) return error;
  revalidatePath("/chat");
  return data;
}
