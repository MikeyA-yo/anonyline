import Link from "next/link";

export default function Nav(){
    return (
        <>
          <nav className="backdrop-blur-md lg:flex md:flex hidden items-center justify-evenly w-full fixed p-5 text-white">
            <Link href={"/"} className="text-xl font-bold">AnonyLine..</Link>
            <div className="p-3 border-[0.5px] border-[#FFFBFF] bg-[#FBFFFF] bg-opacity-10 backdrop-blur-md rounded-full flex gap-3">
                <Link href={"/about"}>About</Link>
                <Link href={"/features"}>Features</Link>
                <Link href={"/contact"}>Contact</Link>
            </div>
            <Link href={"/login"}>Login</Link>
          </nav>
        </>
    )
}