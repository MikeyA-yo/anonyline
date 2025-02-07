"use server"
import { account, ID } from "@/app/appwrite_config/appwriteConfig";
import { hash } from "bcrypt";

export async function createUser( email:string, password:string, name?:string){
    const pwd = await hash(password, 10);
    const result = await account.create(ID.unique(), email, pwd, name);
    return result;
}

export async function loginUser(email:string, password:string){
    const pwd = await hash(password, 10);
    const session = await account.createEmailPasswordSession(email, pwd);
    return session
}