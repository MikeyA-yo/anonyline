import { revalidatePath } from "next/cache";
import { createClient } from '@/app/supabase_config/server';
import { User } from "@supabase/supabase-js";
export async function rooms(user: User) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select()
    .or(`owner.eq.${user.id}, members.cs.{"${user.id}"}`);
  if (error) return [];
  return data;
}

export async function createRoom(name:string, description:string, owner:string, image?:string){
  const supabase = await createClient();
  const { error, data }  =  await supabase.from("rooms").insert({name, description, owner, image}).select();
  if (error) return error;
  revalidatePath("/chat");
  return data[0];
}
export async function updateRoom(name:string, update:room){
    const supabase = await createClient();
    const {error, data} = await supabase.from("rooms").update(update).eq("name", name).select();
    if (error) return error;
    revalidatePath("/chat");
    return data[0];
}
export async function listRooms(){
    const supabase = await createClient();
    const {data, error} = await supabase.from("rooms").select();
    if (error) return [];
    return data;
}

export async function getRoom(name:string){
    const supabase = await createClient();
    const {data, error} = await supabase.from("rooms").select().eq("name", name);
    if (error) return null;
    return data[0];
}
interface room {
    name:string;
    description?:string;
    members?:string[];
    owner:string;
    admin?:string[];
    image?:string;
}