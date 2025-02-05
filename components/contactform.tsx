"use client";

import { useCallback, useReducer, useState } from "react";
function reducer(state: {name:string, email:string, phone:string, message:string}, action:{type:string, value:string}){
    return {...state, [action.type]:action.value};
}
export default function ContactForm(){
    const [state, dp] = useReducer(reducer, {
        name:"",
        email:"",
        phone:"",
        message:"",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const sendMsg = useCallback(async ()=>{
        setLoading(true)
        const res = await fetch ("/api/sendmsg", {
            method:"POST",
            body:JSON.stringify(state),
            headers:{
                "Content-Type":"application/json"
            }
        })
        setLoading(false);
        if (!res.ok) setError(true);
        const jsn = await res.json();
        if (res.ok && jsn.message === "Email sent") {
            setSuccess(true);
            return
        }
        setError(true)
    }, [state]);
    console.log(loading, error, success)
    return (
        <>
          <div className="flex flex-col gap-4 p-5 items-center bg-[#2E073F] shadow-md shadow-[#EBD3F8] lg:min-h-96 md:min-h-80 md:w-[90%] justify-self-end">
            <h3 className="text-2xl">Send me a message</h3>
            <InputGrps>
              <InputContainer>
                <label htmlFor="name">Name</label>
                <input onChange={(e)=>{
                    dp({type:"name", value:e.target.value})
                }} id="name" placeholder="Please enter your name"  className="p-2 rounded-md text-[#2E073F]"/>
              </InputContainer>
              <InputContainer>
                <label htmlFor="email">Email</label>
                <input onChange={(e)=>{
                    dp({type:"email", value:e.target.value})
                }} id="email" type="email" placeholder="Please enter your email" className="p-2 rounded-md text-[#2E073F]" />
              </InputContainer>
            </InputGrps>
            <InputGrps>
              <InputContainer>
                <label htmlFor="Phone">Phone</label>
                <input onChange={(e)=>{
                    dp({type:"phone", value:e.target.value})
                }} id="Phone" type="tel" placeholder="Please enter your phone number" className="p-2 rounded-md text-[#2E073F]" />
              </InputContainer>
            </InputGrps>
            <InputGrps>
              <InputContainer>
                <label htmlFor="msg">Message</label>
                <textarea onChange={(e)=>{
                    dp({type:"message", value:e.target.value})
                }} id="msg" placeholder="Please enter your message" className="p-2 rounded-md text-[#2E073F] min-h-20" />
              </InputContainer>
            </InputGrps>
            <button className="self-end px-2 py-1 bg-[#7A1CAC] rounded" onClick={()=>{
                sendMsg()
            }}>Send</button>
          </div>
        </>
    )
}

 function InputContainer({ children }:{children:React.ReactNode}) {
    return <div className="flex flex-col flex-[1] gap-2">{children}</div>;
  }
 function InputGrps({ children }:{children:React.ReactNode}) {
    return (
      <div className="flex lg:flex-row flex-col w-full gap-2">
        {children}
      </div>
    );
  }