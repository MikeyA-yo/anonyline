import { updateRoom } from "@/components/db";
import { NextRequest } from "next/server";

export async function PUT(req:NextRequest){
  
  try {
    const {name, update} = await req.json();
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