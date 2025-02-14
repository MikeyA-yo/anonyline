import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
 const sampleRooms = [
    "aie030",
    "930040",
    "4904902",
    "93040-250",
    "39439dj",
    "aie030",
    "930040",
    "4904902",
    "93040-250",
    "39439dj",
    "aie030",
    "930040",
    "4904902",
    "93040-250",
    "39439dj",
 ] 
export default function ChatMenu(){
    return (
        <>
        {/* Private Individual Menu */}
        <div className="bg-[#7A1CAC] p-2 rounded-full transition-all duration-500 ease-linear  hover:rounded-md my-4  h-12 w-12 flex items-center justify-center">
            <Link href={"/chat/me"}><FaUser /></Link>
        </div>
        {/* Room menu */}
        <div className="flex flex-col gap-4">
           {sampleRooms.map((v, i)=> (<div key={i} className="bg-[#7A1CAC] p-2 rounded-full transition-all duration-75 ease-in-out  hover:rounded-md h-12 w-12 flex items-center justify-center">
            <Link href={`/chat/${v}`}><FaUserGroup /></Link>
        </div>))}
        </div>
        </>
    )
}