import { loadBasic } from "@tsparticles/basic";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { useEffect, useState } from "react";
// import { loadBasic } from "@tsparticles/basic";
// import { Engine } from "@tsparticles/engine";

export default function ParticlesContainer() {
//   const particlesInit = async (engine: Engine) => {
//     await loadBasic(engine);
//   };
 const [init, setInit] = useState(false);
 const [color, setColor] = useState("#EBD3F8");
  useEffect(()=>{
    initParticlesEngine( async(engine)=>{
        await loadBasic(engine);
        setInit(true)
    })
    const int = setInterval(()=>{
        setColor("#"+Math.floor(Math.random()*16777215).toString(16));// #AD49E1 random color
    }, 7*1000)
    return ()=>{
        clearInterval(int)
    }
  },[])
  return (
    <div className="absolute inset-0 z-0">
      {init && <Particles
        id="tsparticles"
        options={{
          background: {
            color: "transparent", // Keep background transparent
          },
          particles: {
            number: { value: 50 },
            color: { value: color },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" }
            }
          },
          modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
        }}
      />}
    </div>
  );
};