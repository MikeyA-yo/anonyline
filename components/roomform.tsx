"use client";

import { useRef } from "react";
import { InputContainer, InputGrps } from "./contactform";
import { Dialog } from "./dialog";

export default function RoomForm({close}:{close:()=>void}) {
  const formRef =  useRef<HTMLDivElement>(null)
  return (
    <Dialog onClick={(e) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        close()
      }
    }}>
      <div className="flex flex-col gap-4 bg-[#2E073F] p-5 text-[#EBD3F8]" ref={formRef}>
        <InputGrps>
          <InputContainer>
            <label>Room Name:</label>
            <input className="p-2 outline-none rounded border border-[#7A1CAC] text-[#AD49E1]" placeholder="e.g: mikeydiscussionforum" />
          </InputContainer>
          <InputContainer>
            <label>Room Description:</label>
            <input
              className="p-2 outline-none rounded border border-[#7A1CAC] text-[#AD49E1]"
              placeholder="e.g: a community to discuss,God, Programming and Anime"
            />
          </InputContainer>
        </InputGrps>
        <InputGrps>
          <InputContainer>
            <label>Upload Profile Picture</label>
            <input type="file" className="p-2" accept="image/*" />
          </InputContainer>
        </InputGrps>
        <div className="self-end flex gap-4">
          <button className="bg-[#7A1CAC] px-2 py-1 rounded">Create</button>
          <button className="bg-[#7A1CAC] px-2 py-1 rounded" onClick={close}>Cancel</button>
        </div>
      </div>
    </Dialog>
  );
}
