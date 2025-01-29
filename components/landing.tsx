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
          <div className="bg-gradient-to-b from-[#2E073F] to-[#7A1CAC] h-[95svh]">Yoo</div>
        </>
    )
}