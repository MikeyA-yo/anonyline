import Nav from "./nav";

export default function Landing(){
    return (
        <>
          <Nav />
          <Hero />
        </>
    )
}

function Hero(){
    return (
        <>
          <div className="bg-[#2E073F] h-[95svh]">Yoo</div>
        </>
    )
}