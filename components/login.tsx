"use client";
import Image from "next/image";
import { useReducer, useState } from "react";
import { InputContainer, InputGrps } from "./contactform";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { createUser, loginUser } from "./user";
import { AnimateDiv } from "./nav";
import { Models } from "appwrite";

export default function Login() {
  const [loginTxt, setLoginTx] = useState("Login to Your Account");
  const [mode, setMode] = useState("login");
  const [inState, inDp] = useReducer(reducer, {
    email: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [e, setE] = useState(false);
  const [s, setS] = useState(false);
  const [l, setL] = useState(false);
  const [msg, setMsg] = useState("");
  const [session, setSession] = useState<Models.Session>()
  return (
    <>
      <div className="min-h-[100svh] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 bg-[#2E073F]">
        <div className="p-5 lg:block md:block hidden">
          <Image
            src={"/anonymous-1.png"}
            height={500}
            width={500}
            alt="Anonymius\\"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-5 text-[#EBD3F8]">
          <div className="flex flex-col p-5 rounded bg-[#7A1CAC] gap-6">
            {(e || s) && <Msg type={e ? "e" : "s"} msg={msg} />}
            <h2 className="text-3xl font-semibold">{loginTxt}</h2>
            <div>
              {mode === "login" ? (
                <p>
                  Don't have an account ?{" "}
                  <span
                    className="underline cursor-pointer text-[#2E073F]"
                    onClick={() => {
                      setMode("signup");
                      setLoginTx("Create an Account");
                    }}
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account ?{" "}
                  <span
                    className="underline cursor-pointer text-[#2E073F]"
                    onClick={() => {
                      setMode("login");
                      setLoginTx("Login to Your Account");
                    }}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
            {mode ==="signup" &&<InputGrps>
              <InputContainer>
                <label htmlFor="fname">First Name: </label>
                <input id="fname" placeholder="Enter your first name (optional)" className="p-2 rounded-md text-[#2E073F]" onChange={(e)=>{
                    inDp({type:"fName", value:e.target.value})
                }} />
              </InputContainer>
              <InputContainer>
                <label htmlFor="lname">Last Name: </label>
                <input id="lname" placeholder="Enter your last name (optional)" className="p-2 rounded-md text-[#2E073F]" onChange={(e)=>{
                    inDp({type:"lName", value:e.target.value})
                }}/>
              </InputContainer>
            </InputGrps>}
            <InputGrps>
              <InputContainer>
               <label htmlFor="em">Email: <span className="text-[#D00000]">*</span></label>
               <input id="em" placeholder="Enter your email" className="p-2 rounded-md text-[#2E073F]" type="email" onChange={(e)=>{
                    inDp({type:"email", value:e.target.value})
                }} />
              </InputContainer>
            </InputGrps>
            <InputGrps>
              <InputContainer>
               <label htmlFor="pw">Password: <span className="text-[#D00000]">*</span></label>
               <input id="pw" placeholder="Enter your password" className="p-2 rounded-md text-[#2E073F] pl-10" type={!showPw ?"password":"text"} onChange={(e)=>{
                    inDp({type:"password", value:e.target.value})
                }}/>
               <span className="cursor-pointer -translate-y-10 pl-1 w-fit" onClick={()=>{setShowPw(!showPw)}}>{showPw && <FaRegEye className="h-6 w-6 fill-black" />}{!showPw && <FaRegEyeSlash className="h-6 w-6 fill-black"/>}</span>
              </InputContainer>
            </InputGrps>
            <button className="bg-[#AD49E1] py-2 rounded" onClick={()=>{
                if (inState.email.length < 3 || inState.password.length < 4){
                    // not allowed
                    setE(true);
                    setS(false);
                    setMsg("Email invalid or password not required length")
                }
                async function action(){
                    let uName = undefined;
                    if (inState.fName && inState.lName){
                      uName = inState.fName.slice(Math.floor(Math.random()*inState.fName.length), Math.floor(Math.random()*inState.fName.length)) + inState.lName.slice(Math.floor(Math.random()*inState.lName.length), Math.floor(Math.random()*inState.lName.length))
                    }
                    setL(true)
                    switch (mode){
                        case "login":
                        let ss = await loginUser(inState.email, inState.password);
                        setSession(ss);
                         break;
                        default:
                         let user = await createUser(inState.email, inState.password, uName); 
                         
                     }
                     setL(false)
                }
                action()
            }}>{mode == "login" ? "Login ": "Sign up"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Msg({msg,type}:{msg:string; type:string}){
    if (type == "e"){
      return (
        <AnimateDiv initial={{
            opacity: 0,
            y: -10,
          }} animate={{
            opacity: 1,
            y: 0,
          }} transition={{
            duration: 0.3,
            ease: "easeInOut",
          }} className="bg-[#D00000] w-full p-3 rounded">
            {msg}
          </AnimateDiv>
      )
    }else {
      return (
        <AnimateDiv initial={{
            opacity: 0,
            y: -10,
          }} animate={{
            opacity: 1,
            y: 0,
          }} transition={{
            duration: 0.3,
            ease: "easeInOut",
          }} className="bg-[#5D8736] w-full p-3 rounded">
            {msg}
          </AnimateDiv>
      )
    }
}

interface InputState {
  fName?: string;
  lName?: string;
  email: string;
  password: string;
}

interface dpAction {
  type: string;
  value: string;
}

function reducer(state: InputState, action: dpAction) {
  return { ...state, [action.type]: action.value };
}
