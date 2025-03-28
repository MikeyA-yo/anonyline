import { createRoom } from "@/components/db";

export async function POST(req: Request) {
  const { name, description, creator, image } = await req.json();
  try {
    if (!name || !description || !creator){
        return new Response("Missing required fields", { status: 400 });
        
    }
    const result = await createRoom(name, description, creator,  image);
    return Response.json(result);
  } catch (e) {
    if (e instanceof Error){
      return new Response(e.message as string, { status: 500 });
    }
  }
}
