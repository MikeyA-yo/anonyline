"use client";

import { Chat } from "../types/chat";
import { User } from "@supabase/supabase-js";
import { Room } from "../types/room";
import { useState } from "react";
import useAPI from "../hooks/useapi";

interface MessageProps {
  message: Chat;
  currentUser: string;
}

// Message Component
function Message({ message, currentUser }: MessageProps) {
  const isCurrentUser = message.from === currentUser;

  return (
    <div
      className={`flex flex-col ${
        isCurrentUser ? "items-end" : "items-start"
      } mb-4`}
    >
      <span className="text-xs text-[#a5a6a3] mb-1">
        {message.from.slice(0, 10)}
      </span>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser
            ? "bg-[#7A1CAC] text-[#EBD3F8]"
            : "bg-[#2B2D31] text-[#a5a6a3]"
        }`}
      >
        {message.chat}
      </div>
    </div>
  );
}

// Chat Container Component
export default function ChatContainer({
  user,
  room,
  chats
}: {
  user: User;
  room: Room;
  chats: any;
}) {
  const currentUserId = user.id;
  const [msg, setMsg] = useState("");
  const { run, res, error } = useAPI("chat/add", "POST");
  return (
    <div className="flex-1 w-full flex flex-col bg-[#313338] h-[60vh]">
      <div className="flex-1 overflow-y-auto lg:p-4 md:p-4 p-2">
        <div className="lg:max-w-4xl mx-auto lg:space-y-4 md:space-y-4 space-y-2">
          {chats &&
            chats.chats.length >= 1 &&
            chats.chats.map((message: Chat) => (
              <Message
                key={message.id}
                message={message}
                currentUser={currentUserId}
              />
            ))}
        </div>
      </div>

      <div className="bg-[#2B2D31] w-full p-4">
        <div className="lg:max-w-4xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Send a message..."
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              value={msg}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  run("chat/add", "POST", {
                    roomId: room.id,
                    from: user.id,
                    chat: msg,
                  });
                  setMsg("");
                }
              }}
              className="flex-1 bg-[#383A40] text-[#EBD3F8] rounded-md lg:px-4 md:px-4 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
            />
            <button
              className="bg-[#7A1CAC] text-[#EBD3F8] lg:px-6 md:px-6 px-3 py-2 rounded-md hover:bg-[#6A189C] transition-colors"
              onClick={() => {
                run("chat/add", "POST", {
                  roomId: room.id,
                  from: user.id,
                  chat: msg,
                });
                setMsg("");
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
