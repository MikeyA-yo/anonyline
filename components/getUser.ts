import { getUser } from "./user"

export async function getSafeUser(){
    try {
     return await getUser();
    }catch (e){
        return null
    }
}