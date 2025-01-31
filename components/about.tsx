import { Roboto } from "next/font/google"
import Parallax from "./parallax"
import ParallaxTextEffect from "./paralaxtest"

const rob = Roboto({weight:["500"], style:["normal"], subsets:["latin"]})
export default function About(){
    return (
        <>
          <div className="text-[#EBD3F8] flex flex-col items-center justify-center lg:p-20 p-10">
            <div className="z-10">
              <h3 className={`text-2xl font-bold ${rob.className}`}>What is Anonyline?</h3>
            </div>
            <div className="flex flex-col items-center text-center gap-5 z-10">
              <ParallaxTextEffect />
              {/* <Parallax>
                <p className={`text-lg ${rob.className}`}>
                  Anonyline is a platform that allows you to send messages to anyone anonymously. 
                  You can send messages to your friends, family, or even strangers without revealing your identity.
                </p>
              </Parallax>
              <Parallax>
                <p className={`text-lg ${rob.className}`}>
                  We believe that everyone should have the freedom to express themselves without fear of judgement or backlash.
                  Anonyline is a safe space for you to share your thoughts, feelings, and opinions without any consequences.
                </p>
              </Parallax> */}
            </div>
          </div>
        </>
    )
}