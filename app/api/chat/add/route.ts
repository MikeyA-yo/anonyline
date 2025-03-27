import { createChat } from "@/components/chat-db/chatdb";

export async function POST(req: Request) {
  try {
    const { chat, from, roomId } = await req.json();
    if (!chat || !from || (!roomId && typeof roomId !== "number")) {
      return new Response("Missing required fields", { status: 400 });
    }
    const newChat = await createChat(chat, from, roomId);
    if (newChat instanceof Error) {
      throw new Error(newChat.message);
    }
    return Response.json(newChat);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message as string, { status: 500 });
    }
  }
}
