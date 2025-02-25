"use client"
import {Client, Account, Databases} from "appwrite";

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.NEXT_PUBLIC_APP_ID as string);

export const account = new Account(client);
export const database = new Databases(client);
export const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;
export const roomId = process.env.NEXT_PUBLIC_ROOMS as string;
export const pfp = process.env.NEXT_PUBLIC_PFP as string;
export { ID } from 'appwrite';