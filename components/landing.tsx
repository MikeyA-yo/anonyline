import Nav from "./nav";

export default function Landing() {
  return (
    <>
      <div className="w-full h-full bg-[#2E073F]">
        <Nav />
        <Hero />
      </div>
    </>
  );
}

function Hero() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#2E073F] to-[#7A1CAC] h-[95svh]">
        Yoo
      </div>
    </>
  );
}
