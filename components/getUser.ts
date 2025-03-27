import { getUser } from "./user"

export async function getSafeUser(){
    try {
     return await getUser();
    }catch (e){
        if (e instanceof Error){
            console.log(e, e.message)
        }
        return null
    }
}