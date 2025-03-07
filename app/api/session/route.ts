import { getSafeUser } from "@/components/getUser";

export async function GET(){
   const user = await getSafeUser();
   return Response.json(user);
}