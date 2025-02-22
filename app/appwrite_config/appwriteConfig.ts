"use client"
import {Client, Account, Databases} from "appwrite";

export const client = new Client();

client.setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);

export const account = new Account(client);
export const database = new Databases(client);
export const databaseId = process.env.DATABASE_ID as string;
export const roomId = process.env.ROOMS as string;
export const pfp = process.env.PFP as string;
export { ID } from 'appwrite';