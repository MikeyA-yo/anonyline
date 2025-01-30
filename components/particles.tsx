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
  useEffect(()=>{
    initParticlesEngine( async(engine)=>{
        await loadBasic(engine);
        setInit(true)
    })
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
            color: { value: "#EBD3F8" },
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