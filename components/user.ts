"use server"

// import { createSessionClient, createUserClient } from "@/app/appwrite_config/appwrite-server-config";
// import { ID } from "@/app/appwrite_config/appwriteConfig";
import { createClient } from '@/app/supabase_config/server';

export async function createUser( email:string, password:string, name?:string){
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options:{
      emailRedirectTo:``,
      data:{
        name,
      }
    }
  });
 
  return {error, data};
}
export async function loginUser(email:string, password:string){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return {error,data};
}

export async function getUser (){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  return {error,data};
}