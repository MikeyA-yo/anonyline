"use server";

import { createUser, loginUser } from "./user";
import { loginSChema } from "./zconf";

// import { cookies } from "next/headers";
import { ID } from "node-appwrite";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateLogin(formState: any, formData: FormData) {
  const pwd = formData.get("password")?.toString();
  const em = formData.get("email")?.toString();
  const data = loginSChema.safeParse({ password: pwd, email: em });
  if (!data.success) {
    console.log(data.error.errors);
    return {
      errors: data.error.flatten().fieldErrors,
    };
  }
  const { email, password } = data.data;
  const {error} = await loginUser(email, password);
  if (error){
    return {
      errors: error.message
    }
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateAcct(formState: any, formData: FormData) {
  try {const pwd = formData.get("password")?.toString();
    const em = formData.get("email")?.toString();
    const l = formData.get("lname")?.toString();
    const f = formData.get("fname")?.toString();
    const nm = mix(l, f)
    const data = loginSChema.safeParse({password:pwd, email:em, name:nm});
    if (!data.success) {
      console.log(data.error.errors);
      return {
        errors: data.error.flatten().fieldErrors,
      };
    }
    const {name, email, password} = data.data;
    const res = await createUser(email, password, name);
    if (res){
      return {
          success: "Successful, now login"
      }
    }} catch (e){
      if (e instanceof Error)
        {return {
            errors: e.message
        }}
    }
}

function mix(a?:string, b?:string){
    let res = "";
    if (!a || !b){
        return ID.unique();
    }
    for (let i = 0; i < a.length; i++){
        res += a[Math.floor(Math.random()*a.length)] + b[Math.floor(Math.random()*b.length)];
    }
    return res;
}