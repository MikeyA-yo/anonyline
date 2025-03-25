import { listRooms } from "@/components/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    try{
        const { searchParams } = new URL(request.url);
        const room = searchParams.get('room');
        const rooms = await listRooms();
        if(room){
            console.log(room)
            return Response.json(rooms.filter(r => r.name.toLowerCase() === room.toLowerCase()));
        }
        return Response.json(rooms);
    }catch(e){
        return Response.json(e)
    }
}