import { Inter } from "next/font/google"

const inter = Inter({weight:["400", "700"], subsets:["latin"]})
export default function Contact(){
    return (
        <>
          <div className="min-h-[50vh] flex flex-col text-[#EBD3F8] items-center justify-center" id="contact">
            <div className="z-10">
                <h3 className={`${inter.className} text-3xl font-bold `}>Contact</h3>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                <div></div>
            </div>
          </div>
        </>
    )
}