import { createSessionDB, createSessionStorage } from "@/app/appwrite_config/appwrite-server-config";
import { revalidatePath } from "next/cache";
import { Models, Query } from "node-appwrite";
import { createClient } from '@/app/supabase_config/server';
export async function rooms (user:Models.User<Models.Preferences>) {
    const { database } = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.ROOMS as string, [Query.contains("members", [user.$id])]);
}

export async function createRoom(name:string, description:string, owner:string, image?:string){
  const supabase = await createClient();
  const { error, data }  =  await supabase.from("rooms").insert({name, description, owner, image}).select();
  if (error) return error;
  revalidatePath("/chat");
  return data[0];
//   return {error};
}
export async function updateRoom(name:string, update:room){
    const {database} = await  createSessionDB();
    const doc = database.updateDocument(process.env.DATABASE_ID as string, process.env.ROOMS as string, name, update);
    revalidatePath("/chat");
    return doc;
}
export async function listRooms(){
    const supabase = await createClient();
    const {data, error} = await supabase.from("rooms").select();
    if (error) return [];
    return data;
}

export async function listUsers(){
    const {database} = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.USERS as string);   
}
export async function createUser(user:string){
    const {database} = await  createSessionDB();
    return database.createDocument(process.env.DATABASE_ID as string, process.env.USERS as string, user, {user})
}
export async function getRoom(id:string){
    const {database} = await  createSessionDB();
    return database.getDocument(process.env.DATABASE_ID as string, process.env.ROOMS as string, id);
}
interface room {
    name:string;
    description?:string;
    members?:string[];
    owner:string;
    admin?:string[];
    image?:string;
}