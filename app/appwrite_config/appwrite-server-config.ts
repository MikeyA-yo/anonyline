"use server";
import { Client, Account, Databases, Storage, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient(){
    const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);
    const cookieStore = await cookies()
    const session = cookieStore.get("user");
  if (!session || !session.value) {
     throw new Error("No session");
  }
  client.setSession(session.value);
  
  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createSessionDB(){
  const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);
    const cookieStore = await cookies()
    const session = cookieStore.get("user");
  if (!session || !session.value) {
     throw new Error("No session");
  }
  client.setSession(session.value);
  return {
    get database(){
      return new Databases(client)
    }
  }
}
export async function createSessionStorage(){
  const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);
    const cookieStore = await cookies()
    const session = cookieStore.get("user");
  if (!session ||!session.value) {
     throw new Error("No session");
  }
  client.setSession(session.value);
  return {
    get storage(){
      return new Storage(client)
    }
  }
}
export async function createUserClient(){
  const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string).setKey(process.env.APPWRITE_KEY as string);
  return {
    get account(){
      return new Account(client)
    }
  }
}

export async function createSessionUsers(){
  const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);
    const cookieStore = await cookies()
    const session = cookieStore.get("user");
  if (!session ||!session.value) {
     throw new Error("No session");
  }
  client.setSession(session.value);
  return {
    get user(){
      return new Users(client);
    }
  }
}