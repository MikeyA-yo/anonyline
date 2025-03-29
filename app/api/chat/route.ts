import { deleteChat, getChats } from "@/components/chat-db/chatdb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const room = searchParams.get("room");
    if (!room || isNaN(parseInt(room || ""))) {
      return new Response("Missing required fields", { status: 400 });
    }
    const chats = await getChats(parseInt(room));
    chats.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateA - dateB;
    });
    return Response.json({ chats });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message as string, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { chatId, deleter, roomId } = await req.json();
    if (!deleter || typeof roomId !== "number" || typeof chatId !== "number") {
      return new Response("Missing required fields", { status: 400 });
    }
    const msg = await deleteChat(chatId, deleter, roomId);
    if (msg.success) {
      return new Response("Successfully deleted");
    } else {
      return new Response("Failed to delete", { status: 500 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message as string, { status: 500 });
    }
  }
}
