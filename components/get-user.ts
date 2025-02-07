import { account } from "@/app/appwrite_config/appwriteConfig";
async function getUser (){
  const user = await account.get();
  return user;
}