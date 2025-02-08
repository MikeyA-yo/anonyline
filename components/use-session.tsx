"use client";

 import { Models } from "appwrite";


const useLocalSession = ():Models.Session =>{
    return JSON.parse(window.sessionStorage.getItem("user")??"{}");
}

export {useLocalSession};