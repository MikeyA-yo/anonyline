import { FaSearch } from "react-icons/fa";

export default function Find() {
  return (
    <>
      <div className="h-screen overflow-auto w-full bg-[#313338] flex flex-col items-center gap-4">
        <div className="flex text-center flex-col items-center pt-20 gap-2">
          <div className="bg-[#7A1CAC] rounded-full h-24 w-24 items-center justify-center flex">
            <FaSearch className="h-12 w-12 fill-[#EBD3F8]" />{" "}
          </div>
          <h1 className="text-2xl font-bold text-[#EBD3F8]">Find a chat</h1>
          <p className="font-bold text-lg text-[#a5a6a3]">
            Join an existing room, or create a new one, or connect with other
            anonymous users
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <input
            className="bg-[#2B2D31] text-[#EBD3F8] rounded-full w-full p-4"
            type="text"
            placeholder="Search for a chat, enter a room code"
          />
        </div>
      </div>
    </>
  );
}
