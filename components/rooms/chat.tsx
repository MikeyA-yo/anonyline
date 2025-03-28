"use client";
import { FaThumbsUp, FaThumbsDown, FaInfoCircle } from "react-icons/fa";
import { Room } from "../types/room";
import { useState } from "react";

import useAPI from "../hooks/useapi";
import { User } from "@supabase/supabase-js";
import { useRoom } from "../hooks/userooms";
import ChatContainer from "./chat-container";
import useChat from "../hooks/usechat";

export default function RoomChat({
  room: initialRoom,
  user,
}: {
  room: Room;
  user: User;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const { run } = useAPI("rooms/update", "POST");
  const { Room, loading } = useRoom(initialRoom.name);
  const { chats } = useChat(initialRoom.id);
  const room: typeof initialRoom = !loading && Room && Room.length >= 1 ? Room[0] : initialRoom;
  
  const hasVotedStay = room.members?.includes(user?.id);
  const hasVotedGo = room.enemies?.includes(user?.id);

  const handleStayVote = () => {
    const existingMembers: string[] = room.members || [];
    const existingEnemies: string[] = room.enemies || [];

    if (!existingMembers.includes(user?.id)) {
      // Remove from enemies if present
      const updatedEnemies = existingEnemies.filter((id) => id !== user?.id);

      run("rooms/update", "PUT", {
        name: room.name,
        update: {
          stay_votes: hasVotedGo ? room.stay_votes + 1 : room.stay_votes + 1,
          go_votes: hasVotedGo ? room.go_votes - 1 : room.go_votes,
          members: [...existingMembers, user?.id],
          enemies: updatedEnemies,
        },
      });
    }
  };

  const handleGoVote = () => {
    const existingEnemies: string[] = room.enemies || [];
    const existingMembers: string[] = room.members || [];

    if (!existingEnemies.includes(user?.id)) {
      // Remove from members if present
      const updatedMembers = existingMembers.filter((id) => id !== user?.id);

      run("rooms/update", "PUT", {
        name: room.name,
        update: {
          go_votes: hasVotedStay ? room.go_votes + 1 : room.go_votes + 1,
          stay_votes: hasVotedStay ? room.stay_votes - 1 : room.stay_votes,
          enemies: [...existingEnemies, user?.id],
          members: updatedMembers,
        },
      });
    }
  };

  // Update the button classes to include active state
  const stayButtonClass = `flex-1 flex items-center justify-center gap-2 ${
    hasVotedStay ? "bg-[#7A1CAC]" : "bg-[#404249]"
  } hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg`;

  const goButtonClass = `flex-1 flex items-center justify-center gap-2 ${
    hasVotedGo ? "bg-[#7A1CAC]" : "bg-[#404249]"
  } hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg`;

  return (
    <div className="flex h-[100dvh] w-full relative overflow-x-hidden">
      {/* Mobile Info Panel Overlay */}
      <div
        className={`fixed inset-0 bg-[#2B2D31] z-20 transition-transform duration-300 lg:hidden md:hidden 
        ${showInfo ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-4 right-4 text-[#EBD3F8] text-xl"
          >
            ✕
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#7A1CAC] flex items-center overflow-hidden justify-center">
              {room.image ? (
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full hover:scale-125"
                />
              ) : (
                <span className="text-xl m-2">🎭</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-[#EBD3F8]">{room.name}</h2>
          </div>
          <p className="text-[#a5a6a3] text-sm mb-6">{room.description}</p>

          <div className="bg-[#313338] rounded-lg p-4">
            <p className="text-[#EBD3F8] mb-3 text-sm font-medium">
              Should this room stay?
            </p>
            <div className="flex gap-4">
              <button onClick={handleStayVote} className={stayButtonClass}>
                <FaThumbsUp className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">Yes</span>
                <p>{room.stay_votes}</p>
              </button>
              <button onClick={handleGoVote} className={goButtonClass}>
                <FaThumbsDown className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">No</span>
                <p>{room.go_votes}</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Info Panel */}
      <div className="w-80 bg-[#2B2D31] lg:flex md:flex hidden flex-col">
        <div className="p-4 border-b border-[#1E1F22]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#7A1CAC] flex items-center overflow-hidden justify-center">
              {room.image ? (
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full hover:scale-125"
                />
              ) : (
                <span className="text-xl m-2">🎭</span>
              )}
            </div>
            <h2 className="text-xl font-bold text-[#EBD3F8]">{room.name}</h2>
          </div>
          <p className="text-[#a5a6a3] text-sm mb-6">{room.description}</p>

          {/* Room Vote Section */}
          <div className="bg-[#313338] rounded-lg p-4">
            <p className="text-[#EBD3F8] mb-3 text-sm font-medium">
              Should this room stay?
            </p>
            <div className="flex gap-4">
              <button onClick={handleStayVote} className={stayButtonClass}>
                <FaThumbsUp className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">Yes</span>
                <p>{room.stay_votes}</p>
              </button>
              <button onClick={handleGoVote} className={goButtonClass}>
                <FaThumbsDown className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">No</span>
                <p>{room.go_votes}</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col w-full bg-[#313338] relative">
        {/* Mobile Info Button */}
        <button
          onClick={() => setShowInfo(true)}
          className="lg:hidden md:hidden fixed top-4 right-4 bg-[#7A1CAC] p-2 rounded-full text-[#EBD3F8] z-10"
        >
          <FaInfoCircle size={20} />
        </button>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-hidden h-[30vh] p-4 w-full">
          <div className="w-full lg:max-w-4xl mx-auto px-2 sm:px-4">
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="w-20 h-20 rounded-full bg-[#7A1CAC] flex items-center justify-center">
                <span className="text-4xl">💭</span>
              </div>
              <h1 className="lg:text-2xl text-xl font-bold text-[#EBD3F8]">
                Welcome to {room.name}
              </h1>
              <p className="text-[#a5a6a3] text-center text-sm md:text-base">
                This is the beginning of the conversation. Keep it friendly and
                respectful!
              </p>
            </div>
          </div>
        </div>
         <ChatContainer user={user} room={room} chats={chats} />
      </div>
    </div>
  );
}
