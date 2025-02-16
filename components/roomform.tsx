"use client";

import { InputContainer, InputGrps } from "./contactform";
import { Dialog } from "./dialog";

export default function RoomForm({}){
    return (
        <Dialog onClick={()=>{}}>
            <div>
            <InputGrps>
              <InputContainer>
                <label>Room Name:</label>
              </InputContainer>
            </InputGrps>
            </div>
        </Dialog>
    )
}