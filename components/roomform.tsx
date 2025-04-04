"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { InputContainer, InputGrps } from "./contactform";
import { Dialog } from "./dialog";
import useAPI from "./hooks/useapi";
import { PiSpinnerLight } from "react-icons/pi";
import { User } from "@supabase/supabase-js";

export default function RoomForm({close, user}:{close:()=>void; user:User}) {
  const {res:Room, error, loading, run} = useAPI("rooms/create", "POST");
  const [e, setE] = useState(false);
  const [etxt, setETxt] = useState("");
  const formRef =  useRef<HTMLDivElement>(null);
  const [formField, dp] = useReducer(formReducer, {
    roomName: "",
    roomDescription: "",
    profilePicture: null as File | null,
  })
  
  useEffect(()=>{
    if (error){
      setE(true);
      setETxt(error)
    }
    if (Room && typeof Room !== "string"){
      setE(false);
      close();
    }
  },[Room, error])
  return (
    <Dialog onClick={(e) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        close()
      }
    }}>
      <div className="flex flex-col gap-4 bg-[#2E073F] p-5 text-[#EBD3F8]" ref={formRef}>
        {e && <p className="text-[#913423]">Error Creating Room: {etxt} </p>}
        {Room && typeof Room !== "string" && <p className="text-[#349223]">Room Created: {Room.name}</p>}
        <InputGrps>
          <InputContainer>
            <label>Room Name:</label>
            <input onChange={(e)=>{ dp({type:"roomName", value:e.target.value})}} className="p-2 outline-none rounded border border-[#7A1CAC] text-[#AD49E1]" placeholder="e.g: mikeydiscussionforum" />
          </InputContainer>
          <InputContainer>
            <label>Room Description:</label>
            <input
            onChange={(e)=>{ dp({type:"roomDescription", value:e.target.value})}}
              className="p-2 outline-none rounded border border-[#7A1CAC] text-[#AD49E1]"
              placeholder="e.g: a community to discuss,God, Programming and Anime"
            />
          </InputContainer>
        </InputGrps>
        <InputGrps>
          <InputContainer>
            <label>Upload Profile Picture</label>
            <input type="file" onChange={(e)=>{
              dp({type:"profilePicture", value:e.target.files ? e.target.files[0] : null})
            }} className="p-2" accept="image/*" />
          </InputContainer>
        </InputGrps>
        <div className="self-end flex gap-4">
          <button className="bg-[#7A1CAC] px-2 py-1 rounded" disabled={loading} onClick={()=>{
            if (!formField.roomName ){
               setE(true);
               setETxt("Room Name is required");
            }
           async function create(){
            const buffer = formField.profilePicture ? await formField.profilePicture.arrayBuffer() : null;
            const bufU8 = new Uint8Array(buffer as ArrayBuffer);
            const image = "data:image/png;base64,"+Buffer.from(bufU8).toString("base64");
            run("rooms/create", "POST", {
              name: formField.roomName,
              description: formField.roomDescription,
              creator: user.id,
              image
            })
           }
           create();
          }}>{loading ? <PiSpinnerLight className={`${loading? "animate-spin":""}`} /> : "Create"}</button>
          <button className="bg-[#7A1CAC] px-2 py-1 rounded" onClick={close}>Cancel</button>
        </div>
      </div>
    </Dialog>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formReducer (state:any, action:any){
  return {...state, [action.type]: action.value}
}