import { getUser } from "@/components/user";

export async function GET(req:Request, res:Response){
   return Response.json(await getUser());
}