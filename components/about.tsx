// import { oto } from "next/font/google"
import { AnimateDiv } from "./nav"

// const  = oto({weight:["500"], style:["normal"], subsets:["latin"]})
export default function About(){
    return (
        <>
          <div className="text-[#EBD3F8] min-h-[50vh] flex flex-col items-center justify-center gap-10 lg:p-20 p-10" id="about">
            <div className="z-10">
              <h3 className={`text-2xl font-bold`}>What is Anonyline?</h3>
            </div>
            <div className="flex flex-col gap-4 text-center z-10">
              <AnimateDiv initial={{opacity:0, y:"70%"}} whileInView={{opacity:[0.5, 1], y:0}} transition={{duration:0.3, delay:0.2}} viewport={{once:true}}>
                <p className={`text-lg`}>Anonyline is a platform where you can share your thoughts, ideas, and opinions anonymously.</p>
              </AnimateDiv>
              <AnimateDiv initial={{opacity:0, y:"70%"}} whileInView={{opacity:[0.5, 1], y:0}} transition={{duration:0.3, delay:0.3}} viewport={{once:true}}>
                <p className={`text-lg`}>You can create a post and share it with the world without revealing your identity.</p>
              </AnimateDiv>
              <AnimateDiv initial={{opacity:0, y:"70%"}} whileInView={{opacity:[0.5, 1], y:0}} transition={{duration:0.3, delay:0.4}} viewport={{once:true}}>
                <p className={`text-lg`}>Explore and Create your own room, where you can talk with people all over the world anonymously</p>
                </AnimateDiv>
            </div>
          </div>
        </>
    )
}