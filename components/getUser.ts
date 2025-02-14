import { getUser } from "./user"

export async function getSafeUser(){
    try {
     return await getUser();
    }catch (e:any){
        console.log(e, e.message)
        return null
    }
}