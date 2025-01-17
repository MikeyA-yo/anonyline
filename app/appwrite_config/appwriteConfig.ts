import {Client, Account, Databases} from "appwrite";

export const client = new Client();

client.setEndpoint(process.env.APPWRITE_URL as string).setProject(process.env.APPWRITE_ID as string);

export const account = new Account(client);
export const database = new Databases(client);

export { ID } from 'appwrite';