import { createSessionClient } from "@/app/appwrite_config/appwrite-server-config";
import { createUser } from "@/components/db";


export async function GET(){
    try {
        const user = await (await createSessionClient()).account.get();
        await createUser(user.$id);
        const users = [{user}];
        return Response.json(users);
    } catch(e) {
        return Response.json(e);
    }
}