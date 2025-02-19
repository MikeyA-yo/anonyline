import { createSessionDB } from "@/app/appwrite_config/appwrite-server-config";
import { Models, Query } from "node-appwrite";

export async function rooms (user:Models.User<Models.Preferences>) {
    const { database } = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.ROOMS as string, [Query.contains("members", [user.$id])]);
}

export async function createRoom(){
    const {database} = await  createSessionDB();
}

export async function listRooms(){
    const {database} = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.ROOMS as string);
}

export async function listUsers(){
    const {database} = await  createSessionDB();
    return database.listDocuments(process.env.DATABASE_ID as string, process.env.USERS as string);   
}