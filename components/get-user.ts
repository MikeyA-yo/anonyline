import { account } from "@/app/appwrite_config/appwriteConfig";
export async function getUser (){
  const user = await account.get();
  return user;
}