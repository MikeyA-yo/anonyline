import { Roboto } from "next/font/google"

const rob = Roboto({weight:["500"], style:["normal"], subsets:["latin"]})
export default function About(){
    return (
        <>
          <div className="h-[50vh] text-[#EBD3F8] flex flex-col items-center justify-center">
            <div className="z-10">
              <h3 className={`text-2xl font-bold ${rob.className}`}>What is Anonyline?</h3>
            </div>
          </div>
        </>
    )
}