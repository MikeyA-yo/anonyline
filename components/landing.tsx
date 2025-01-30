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
      <div className="bg-gradient-to-b text-center px-4 flex flex-col items-center justify-center gap-5 from-[#2E073F] to-[#7A1CAC] h-[100svh]">
        <div>
            <h2 className="lg:text-3xl text-2xl bg-gradient-to-r font-extrabold from-[#AD49E1] to-[#EBD3F8] text-transparent bg-clip-text">Enjoy seamless anonymous chat with Anonyline</h2>
        </div>
      </div>
    </>
  );
}
