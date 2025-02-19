import { createRoom } from "@/components/db";

export async function POST(req: Request, res: Response) {
  const { name, description, creator, pfp } = await req.json();
  try {
    if (!name || !description || !creator){
        return new Response("Missing required fields", { status: 400 });
        
    }
    console.log(pfp)
    const result = await createRoom(name, description, creator, Buffer.from(pfp));
    return Response.json(result);
  } catch (e:any) {
    return new Response(e.message as string, { status: 500 });
  }
}
