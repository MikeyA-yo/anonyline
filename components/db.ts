import { createSessionDB, createSessionStorage } from "@/app/appwrite_config/appwrite-server-config";
import { revalidatePath } from "next/cache";
import { Models, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

export async function rooms (user:Models.User<Models.Preferences>) {
    const { database } = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.ROOMS as string, [Query.contains("members", [user.$id])]);
}

export async function createRoom(name:string, description:string, creator:string, profileImage?:Buffer){
    const {database} = await  createSessionDB();
    const {storage} = await createSessionStorage();
    profileImage && storage.createFile(process.env.PFP as string, name, InputFile.fromBuffer(profileImage, name));
    let doc = database.createDocument(process.env.DATABASE_ID as string, process.env.ROOMS as string, name, {
        name,
        description,
        members: [creator],
        owner: creator,
        admin:[creator]
    })
    revalidatePath("/chat");
    return doc;
}

export async function listRooms(){
    const {database} = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.ROOMS as string);
}

export async function listUsers(){
    const {database} = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.USERS as string);   
}