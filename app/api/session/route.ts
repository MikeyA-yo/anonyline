import { getSafeUser } from "@/components/getUser";

export async function GET(req:Request, res:Response){
   const user = await getSafeUser();
   return Response.json(user);
}