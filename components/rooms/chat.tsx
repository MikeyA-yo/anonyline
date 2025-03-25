"use client";
import { FaThumbsUp, FaThumbsDown, FaInfoCircle } from "react-icons/fa";
import { Room } from "../types/room";
import { useState } from "react";

import useAPI from "../hooks/useapi";
import { User } from "@supabase/supabase-js";

export default function RoomChat({ room, user }: { room: Room, user: User }) {
  const [showInfo, setShowInfo] = useState(false);
  const { run } = useAPI("rooms/update", "POST");
  return (
    <div className="flex h-screen w-full relative">
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
              <button
                onClick={() => {
                  const existingMembers = room.members || [];
                  if (!existingMembers.includes(user?.id)) {
                    existingMembers.push(user?.id);
                  }
                  run("rooms/update", "PUT", {
                    name: room.name,
                    update: {
                      stay_votes: room.stay_votes + 1,
                      members: existingMembers
                    },
                  });
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#404249] hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg"
              >
                <FaThumbsUp className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">Yes</span>
                <p>{room.stay_votes}</p>
              </button>
              <button
                onClick={() => {
                  run("rooms/update", "PUT", {
                    name: room.name,
                    update: {go_votes:room.go_votes + 1},
                  });
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#404249] hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg"
              >
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
              <button className="flex items-center gap-2 bg-[#404249] hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg">
                <FaThumbsUp className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">Yes</span>
              </button>
              <button className="flex items-center gap-2 bg-[#404249] hover:bg-[#7A1CAC] transition-colors px-4 py-2 rounded-lg">
                <FaThumbsDown className="text-[#EBD3F8]" />
                <span className="text-[#EBD3F8]">No</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#313338] relative">
        {/* Mobile Info Button */}
        <button
          onClick={() => setShowInfo(true)}
          className="lg:hidden md:hidden absolute top-4 right-4 bg-[#7A1CAC] p-2 rounded-full text-[#EBD3F8] z-10"
        >
          <FaInfoCircle size={20} />
        </button>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="w-24 h-24 rounded-full bg-[#7A1CAC] flex items-center justify-center">
                <span className="text-4xl">💭</span>
              </div>
              <h1 className="text-2xl font-bold text-[#EBD3F8]">
                Welcome to {room.name}
              </h1>
              <p className="text-[#a5a6a3] text-center">
                This is the beginning of the conversation. Keep it friendly and
                respectful!
              </p>
            </div>
          </div>
        </div>

        {/* Message Input Area */}
        <div className="bg-[#2B2D31] p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Send a message..."
                className="flex-1 bg-[#383A40] text-[#EBD3F8] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
              />
              <button className="bg-[#7A1CAC] text-[#EBD3F8] px-6 py-2 rounded-md hover:bg-[#6A189C] transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
