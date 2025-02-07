"use server"
import { account, ID } from "@/app/appwrite_config/appwriteConfig";

export async function createUser( email:string, password:string, name?:string){
    if (name){
      name = name.length < 3 ? name.concat(name) : name;
    }
    const result = await account.create(ID.unique(), email, password, name);
    return result;
}

export async function loginUser(email:string, password:string){
    const session = await account.createEmailPasswordSession(email, password);
    return session
}