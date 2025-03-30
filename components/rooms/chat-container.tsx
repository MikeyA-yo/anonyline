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
  chats,
}: {
  user: User;
  room: Room;
  chats: any;
}) {
  const currentUserId = user.id;
  const [msg, setMsg] = useState("");
  const { run: sendMessage } = useAPI("chat/add", "POST");
  const { run: updateSeen, loading: updateLoading } = useAPI("chat/add", "PUT");
  const { run: removeLastSeen, loading: removeSeenLoading } = useAPI("chat/rls", "POST");
  
  const chatRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<string | null>(null);
  const processedRef = useRef<number[]>([]);
  const initialReadRun = useRef(false);
  
  const [read, setRead] = useState<Chat[]>([]);
  const [unRead, setUnread] = useState<Chat[]>([]);
  const [isUpdatingSeen, setIsUpdatingSeen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Scroll to bottom effect
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chats]);

  // Read/Unread processing effect
  useEffect(() => {
    if (!chats?.chats) return;

    if (!initialReadRun.current) {
      // Initial run logic remains the same
      const currentMessages = chats.chats;
      const seenMessages: Chat[] = [];
      const unseenMessages: Chat[] = [];

      let lastSeenIndex = -1;
      for (let i = currentMessages.length - 1; i >= 0; i--) {
        if ((currentMessages[i].seen || []).includes(user.id)) {
          lastSeenIndex = i;
          break;
        }
      }

      currentMessages.forEach((chat: Chat, index: number) => {
        if (processedRef.current.includes(chat.id)) return;
        processedRef.current.push(chat.id);

        if (index <= lastSeenIndex) {
          seenMessages.push(chat);
        } else {
          unseenMessages.push(chat);
        }
      });

      setRead(seenMessages);
      setUnread(unseenMessages);
      initialReadRun.current = true;
    } else {
      console.log("Updating messages...");
      const newChats = chats.chats;
      const newReads: Chat[] = [];
      const newUnreads: Chat[] = [];

      // First, handle existing messages and check for updates/deletions
      newChats.forEach((chat: Chat) => {
        // Check if message exists in either read or unread
        const existingRead = read.find(msg => msg.id === chat.id);
        const existingUnread = unRead.find(msg => msg.id === chat.id);

        if (existingRead) {
          // Message exists in read - check if it was updated
          if (JSON.stringify(existingRead) !== JSON.stringify(chat)) {
            // Message was updated, maintain its read status
            newReads.push(chat);
          } else {
            newReads.push(existingRead);
          }
          return;
        }

        if (existingUnread) {
          // Message exists in unread - check if it was updated
          if (JSON.stringify(existingUnread) !== JSON.stringify(chat)) {
            // Message was updated, maintain its unread status
            newUnreads.push(chat);
          } else {
            newUnreads.push(existingUnread);
          }
          return;
        }

        // This is a new message
        if (!processedRef.current.includes(chat.id)) {
          processedRef.current.push(chat.id);
          
          // If there are unread messages, new ones go to unread
          if (unRead.length > 0) {
            newUnreads.push(chat);
          } else {
            newReads.push(chat);
          }
        }
      });

      // Remove processed IDs that no longer exist in the chat
      processedRef.current = processedRef.current.filter(id => 
        newChats.some((chat: Chat) => chat.id === id)
      );

      // Update states
      setRead(newReads);
      setUnread(newUnreads);
      console.log({newReads, newUnreads});
    }
  }, [chats?.chats]);

  // Handle seen status updates
  useEffect(() => {
    if (!chats?.chats || chats.chats.length === 0 || isUpdating) return;

    const lastMessage = chats.chats[chats.chats.length - 1];

    // Only update if this is a new last message
    if (
      lastMessage.id !== lastMessageRef.current &&
      !(lastMessage.seen || []).includes(user.id)
    ) {
      lastMessageRef.current = lastMessage.id;
      setIsUpdating(true);

      // First remove previous seen records
      removeLastSeen("chat/rls", "POST", {
        roomId: room.id,
        userId: user.id,
      });
    }
  }, [chats]);

  // Watch removeSeenLoading to trigger updateSeen
  useEffect(() => {
    if (!removeSeenLoading && isUpdating && lastMessageRef.current) {
      const lastMessage = chats.chats[chats.chats.length - 1];
      
      updateSeen("chat/add", "PUT", {
        chatId: lastMessage.id,
        update: {
          seen: [...(lastMessage.seen || []), user.id],
        },
      });
    }
  }, [removeSeenLoading]);

  // Reset isUpdating when both operations complete
  useEffect(() => {
    if (!updateLoading && !removeSeenLoading && isUpdating) {
      setIsUpdating(false);
    }
  }, [updateLoading, removeSeenLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      processedRef.current = [];
      
      if (chats?.chats?.length > 0) {
        const lastMessage = chats.chats[chats.chats.length - 1];
        const seen = lastMessage.seen || [];
        
        if (!seen.includes(user.id)) {
          updateSeen("chat/add", "PUT", {
            chatId: lastMessage.id,
            update: {
              seen: [...seen, user.id],
            },
          });
        }
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (!msg.trim()) return;
    
    sendMessage("chat/add", "POST", {
      roomId: room.id,
      from: user.id,
      chat: msg,
    });
    setMsg("");
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-[#313338] h-[60vh]">
      <div className="flex-1 overflow-y-auto lg:p-4 md:p-4 p-2">
        <div
          ref={chatRef}
          className="lg:max-w-4xl mx-auto lg:space-y-4 md:space-y-4 space-y-2"
        >
          {/* Render read messages */}
          {read.map((message: Chat) => (
            <Message
              key={message.id}
              message={message}
              currentUser={currentUserId}
            />
          ))}

          {/* Unread messages separator */}
          {unRead.length > 0 && (
            <div className="flex items-center gap-2 my-4">
              <div className="h-[1px] flex-1 bg-[#7A1CAC]"></div>
              <span className="text-[#7A1CAC] text-sm font-medium">
                {unRead.length} unread message{unRead.length !== 1 ? 's' : ''}
              </span>
              <div className="h-[1px] flex-1 bg-[#7A1CAC]"></div>
            </div>
          )}

          {/* Render unread messages */}
          {unRead.map((message: Chat) => (
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
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-[#383A40] text-[#EBD3F8] rounded-md lg:px-4 md:px-4 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#7A1CAC] text-[#EBD3F8] lg:px-6 md:px-6 px-3 py-2 rounded-md hover:bg-[#6A189C] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
