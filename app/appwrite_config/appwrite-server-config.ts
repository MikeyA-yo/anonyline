"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient(){
    const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);
    const session = (await cookies()).get("user");
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

export async function createUserClient(){
  const client = new Client().setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);
  return {
    get account(){
      return new Account(client)
    }
  }
}