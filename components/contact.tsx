import { Inter, Roboto_Mono } from "next/font/google"
import ContactForm from "./contactform"
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md"
import { FaGithub } from "react-icons/fa";
import "@/components/css/contact.css";

const inter = Inter({weight:["400", "700"], subsets:["latin"]})
const robMono = Roboto_Mono({weight:["400", "700"], subsets:["latin"]});
export default function Contact(){
    return (
        <>
          <div className="min-h-[50vh] flex flex-col text-[#EBD3F8] items-center justify-center p-8 gap-5" id="contact">
            <div className="z-10">
                <h3 className={`${inter.className} text-3xl font-bold `}>Contact</h3>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 z-10">
                <div className={`lg:grid-cols-3 grid md:grid-cols-2 grid-cols-1 justify-self-center gap-4 ${robMono.className}`}>
                    <div className="h-52 w-52 bg-[#7A1CAC] shadow-md shadow-[#EBD3F8] flex flex-col items-center hyphens-manual gap-4 p-5 relative hover:animate-moving-border">
                      <MdOutlineEmail className="h-10 w-10 text-[#EBD3F8]" />
                      <h4 className={`text-lg font-bold`}>Email</h4>
                      <a href="mailto:ayomideoluwatola1@gmail.com" className="text-sm">ayomideoluwatola1&shy;@gmail.com</a>
                    </div>
                    <div className="h-52 w-52 bg-[#7A1CAC] shadow-md shadow-[#EBD3F8] flex flex-col items-center gap-4 p-5">
                       <MdOutlinePhone className="h-10 w-10 text-[#EBD3F8]" />
                       <h4 className={`text-lg font-bold`}>Phone</h4>
                       <a href="https://wa.me/2348089132385" className="text-sm">+234 808 913 2385</a>
                    </div>
                    <div className="h-52 w-52 bg-[#7A1CAC] shadow-md shadow-[#EBD3F8] flex flex-col items-center gap-4 p-5">
                      <FaGithub className="h-10 w-10 text-[#EBD3F8]" />
                      <h4 className={`text-lg font-bold`}>Github</h4>
                      <a href="https://github.com/MikeyA-yo" className="text-sm">MikeyA-yo</a>
                    </div>
                </div>
                <ContactForm />
            </div>
            <div>
                <p className="text-sm">&copy; {new Date().getFullYear()} Anonyline, Oluwatola Ayomide, C.H.O Inc</p>
            </div>
          </div>
        </>
    )
}