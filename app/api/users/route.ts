import { listUsers } from "@/components/db";

export async function GET() {
    try {
        const users = await listUsers();
        return Response.json(users);
    } catch (e){
        return Response.json(e);
    }
}