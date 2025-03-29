import { removeLastSeenPoint } from "@/components/chat-db/chatdb";

export async function POST(req: Request) {
  try {
    const { roomId, userId } = await req.json();
    console.log(roomId, userId)
    if (!roomId || !userId) {
      return new Response("Missing required fields", { status: 400 });
    }
    const a = await removeLastSeenPoint(roomId, userId);
    console.log(a);
    // if (error && error instanceof Error) {
    //   return new Response(error.message, { status: 500 });
    // }
    return Response.json(a);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message as string, { status: 500 });
    }
  }
}