import About from "./about";
import Hero from "./hero";
import Nav from "./nav";

export default function Landing() {
  return (
    <>
      <div className="w-full h-full bg-[#2E073F]">
        <Nav />
        <Hero />
        <About />
      </div>
    </>
  );
}


