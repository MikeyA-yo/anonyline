"use client";

import { Chat } from "../types/chat";
import { User } from "@supabase/supabase-js";
import { Room } from "../types/room";
import { useEffect, useRef, useState } from "react";
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
  const { run } = useAPI("chat/add", "POST");
  const chatRef = useRef<HTMLDivElement>(null);
  const {run: run2, loading: updateLoading} = useAPI("chat/rls", "POST");
  const [isUpdating, setIsUpdating] = useState(false);
  const lastMessageRef = useRef<string | null>(null);
  const [read, setRead] = useState<Chat[]>([]);
  const [unRead, setUnread] = useState<Chat[]>([]);
  const processedRef = useRef<number[]>([]);

  // Handle scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({behavior:"smooth", block:"end"})
    }
  }, [chats]);

  // Modified effect for processing read/unread messages
  useEffect(() => {
    if (!chats?.chats) return;

    const currentMessages = chats.chats;
    const seenMessages: Chat[] = [];
    const unseenMessages: Chat[] = [];
    
    // Find the last seen message index
    let lastSeenIndex = -1;
    for (let i = currentMessages.length - 1; i >= 0; i--) {
      if ((currentMessages[i].seen || []).includes(user.id)) {
        lastSeenIndex = i;
        break;
      }
    }

    // Process all messages based on the last seen index
    currentMessages.forEach((chat: Chat, index: number) => {
      // Skip if already processed
      if (processedRef.current.includes(chat.id)) return;
      
      // Mark as processed
      processedRef.current.push(chat.id);

      // If index is less than or equal to lastSeenIndex, it's read
      if (index <= lastSeenIndex) {
        seenMessages.push(chat);
      } else {
        unseenMessages.push(chat);
      }
    });

    // Update states only if we have new messages
    if (seenMessages.length > 0) {
      setRead(prev => [...prev, ...seenMessages]);
    }
    if (unseenMessages.length > 0) {
      setUnread(prev => [...prev, ...unseenMessages]);
    }

  }, [chats?.chats, user.id]);

  // Clear processed messages on unmount
  useEffect(() => {
    return () => {
      processedRef.current = [];
    };
  }, []);

  // Log for debugging
  useEffect(() => {
    console.log('Read messages:', read);
    console.log('Unread messages:', unRead);
  }, [read, unRead]);

  // Clear previous seen records on mount
  useEffect(() => {
    run2("chat/rls", "POST", {
      roomId: room.id,
      userId: user.id,
    });
  }, []);

  // Handle marking last message as seen
  useEffect(() => {
    if (!chats?.chats || chats.chats.length === 0 || isUpdating) return;

    const lastMessage = chats.chats[chats.chats.length - 1];
    
    // Only update if this is a new last message
    if (lastMessage.id !== lastMessageRef.current && !(lastMessage.seen || []).includes(user.id)) {
      lastMessageRef.current = lastMessage.id;
      setIsUpdating(true);

      run2("chat/add", "PUT", {
        chatId: lastMessage.id,
        update: {
          seen: [...(lastMessage.seen || []), user.id]
        }
      })
    }
  }, [chats]);

  // Reset isUpdating when the API call completes
  useEffect(() => {
    if (!updateLoading && isUpdating) {
      setIsUpdating(false);
    }
  }, [updateLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chats?.chats && chats.chats.length > 0) {
        const lastMessage = chats.chats[chats.chats.length - 1];
        run2("chat/add", "PUT", {
          chatId: lastMessage.id,
          update: {
            seen: [...(lastMessage.seen || []), user.id]
          }
        });
      }
    };
  }, []);
  console.log(read, unRead)
  return (
    <div className="flex-1 w-full flex flex-col bg-[#313338] h-[60vh]">
      <div className="flex-1 overflow-y-auto lg:p-4 md:p-4 p-2">
        <div ref={chatRef} className="lg:max-w-4xl mx-auto lg:space-y-4 md:space-y-4 space-y-2">
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