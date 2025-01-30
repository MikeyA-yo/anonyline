import About from "./about";
import Hero from "./hero";
import Nav from "./nav";
import ParticlesContainer from "./particles";
export default function Landing() {
  return (
    <>
      <div className="w-full h-full bg-gradient-to-b from-[#2E073F] via-[#7A1CAC] to-[#AD49E1]">
        <ParticlesContainer />
        <div className="z-20 w-full h-full">
          <Nav />
          <Hero />
          <About />
        </div>
      </div>
    </>
  );
}
