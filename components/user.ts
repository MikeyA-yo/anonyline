"use server"

import 'server-only';
import { createSessionClient, createUserClient } from "@/app/appwrite_config/appwrite-server-config";
import { ID } from "@/app/appwrite_config/appwriteConfig";
import { cookies } from "next/headers";

export async function createUser( email:string, password:string, name?:string){
  const {account} = await createUserClient();
    if (name){
      name = name.length < 3 ? name.concat(name) : name;
    }
    const result = await account.create(ID.unique(), email, password, name);
    return result;
}
export async function loginUser(email:string, password:string){
  
  const {account} = await createUserClient();
    const session = await account.createEmailPasswordSession(email, password);
    const cookieStore = await cookies();
    cookieStore.set("user", session.secret,{
      
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV == "development",
      
    })
    return session
}

export async function getUser (){
  const {account} = await createSessionClient();
  const user = await account.get();
  console.log(user)
  return user;
}