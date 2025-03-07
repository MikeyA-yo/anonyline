import { updateRoom } from "@/components/db";
import { NextRequest } from "next/server";

export async function PUT(req:NextRequest){
  const {name, update} = await req.json();
  try {
    if (!name || !update){
      return new Response("Missing required fields", {status:400});
    }
    const result = await updateRoom(name, update);
    return Response.json(result);
  }catch (e){
    if ( e instanceof Error){
      return new Response(e.message as string, {status:500});
    }
  }
}