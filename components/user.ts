"use server"

import 'server-only';
import { createSessionClient, createUserClient } from "@/app/appwrite_config/appwrite-server-config";
import { ID } from "@/app/appwrite_config/appwriteConfig";

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
    
    return session
}

export async function getUser (){
  const {account} = await createSessionClient();
  const user = await account.get();
  return user;
}