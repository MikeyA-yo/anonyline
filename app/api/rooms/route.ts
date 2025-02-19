import { listRooms } from "@/components/db";

export async function GET(){
    try{
        const rooms = await listRooms();
        return Response.json(rooms);
    }catch(e){
        return Response.json(e)
    }
}