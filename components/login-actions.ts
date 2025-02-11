"use server";

import { redirect } from "next/navigation";
import { loginUser } from "./user";
import { loginSChema } from "./zconf";

import { cookies } from "next/headers";

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
  const session = await loginUser(email, password);
  if (session) {
    const cookieStore = await cookies();
    cookieStore.set("user", session.$id, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 4 * 7 * 24 * 60 * 60 * 1000),
    });
    console.log(cookieStore.get("user"), session);
    return redirect("/chat");
  }
}

export async function CreateAcct(formState: any, formData: FormData) {
  const pwd = formData.get("password");
  const em = formData.get("email");
}
