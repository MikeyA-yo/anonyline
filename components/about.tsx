import { Roboto } from "next/font/google"
import Parallax from "./parallax"

const rob = Roboto({weight:["500"], style:["normal"], subsets:["latin"]})
export default function About(){
    return (
        <>
          <div className="text-[#EBD3F8] flex flex-col items-center justify-center lg:p-20 p-10">
            <div className="z-10">
              <h3 className={`text-2xl font-bold ${rob.className}`}>What is Anonyline?</h3>
            </div>
            <div className=" text-center z-10">
              <Parallax />
            </div>
          </div>
        </>
    )
}