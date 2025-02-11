"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient(){
    const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string).setKey(process.env.APPWRITE_KEY as string);
    const cookieStore = await cookies()
    const session = cookieStore.get("user");
  if (!session || !session.value) {
     throw new Error("No session");
  }
  console.log(session)
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createUserClient(){
  const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);
  return {
    get account(){
      return new Account(client)
    }
  }
}