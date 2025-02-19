"use client";
import { FaSearch } from "react-icons/fa";
import useAPI from "./hooks/useapi";
import { use, useEffect, useReducer, useState } from "react";
import RoomForm from "./roomform";
import { Models } from "node-appwrite";


function resultReducer (state:any, action:any){
  return {[action.type]:action.value, ...state}
}
export default function Find({user}:{user:Models.User<Models.Preferences>}) {
  const {res:Rooms, error, loading} = useAPI("rooms");
  const {res:Users, error:e, loading:userLoad} = useAPI("users");
  const [isCreate, setIsCreate] = useState(false);
  const [input, setInput] = useState("");
  const [result, dispatch] = useReducer(resultReducer, {
    result:[],
    room:[],
    user:[]
  })
  useEffect(()=>{
    if(Rooms && Users){
      dispatch({type:"room", value:Rooms.documents})
      dispatch({type:"user", value:Users.documents})
      dispatch({type:"result", value:[...Rooms.documents, ...Users.documents]})
    }
  },[Rooms, Users])
  useEffect(()=>{
    if(input.length > 0){
      dispatch({type:"result", value:[...result.room, ...result.user].filter((room:any)=>room.$id.toLowerCase().includes(input.toLowerCase()))})
    }else if (input.length === 0){
      dispatch({type:"result", value:[...result.room, ...result.user]}) 
    }
  },[input])
  return (
    <>
      <div className="h-screen px-5 overflow-auto w-full bg-[#313338] flex flex-col items-center gap-4">
        <div className="flex text-center flex-col items-center pt-20 gap-2">
          <div className="bg-[#7A1CAC] rounded-full h-24 w-24 items-center justify-center flex">
            <FaSearch className="h-12 w-12 fill-[#EBD3F8]" />{" "}
          </div>
          <h1 className="text-2xl font-bold text-[#EBD3F8]">Find a chat</h1>
          <p className="font-bold text-lg text-[#a5a6a3]">
            Join an existing room, or create a new one, or connect with other
            anonymous users
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <input
            className="bg-[#2B2D31] text-[#EBD3F8] rounded-full w-full p-4"
            type="text"
            placeholder="Search for a chat, enter a room code"
            onChange={(e)=>{
              setInput(e.target.value);
            }}
          />
        </div>
        {isCreate && <RoomForm user={user} close={()=>{
          setIsCreate(false)
        }} />}
        {result.result.length === 0 && <NotFound create={()=>{
          setIsCreate(true);
        }} />}
      </div>
    </>
  );
}

function NotFound({create}:{create: () => void}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-[#EBD3F8]">
        No results found
      </h1>
      <p className="text-[#a5a6a3] text-center">  
        Try searching for something else or <span className="cursor-pointer underline" onClick={()=>{
          create();
        }}>Create a new room</span>
      </p>
    </div>
  );
}
