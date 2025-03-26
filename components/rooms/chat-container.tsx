"use client";

import { Chat } from "../types/chat";
import { User } from "@supabase/supabase-js";

interface MessageProps {
  message: Chat;
  currentUser: string;
}

// Message Component
function Message({ message, currentUser }: MessageProps) {
  const isCurrentUser = message.from === currentUser;

  return (
    <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} mb-4`}>
      <span className="text-xs text-[#a5a6a3] mb-1">{message.from.slice(0, 10)}</span>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isCurrentUser
            ? 'bg-[#7A1CAC] text-[#EBD3F8]'
            : 'bg-[#2B2D31] text-[#a5a6a3]'
        }`}
      >
        {message.chat}
      </div>
    </div>
  );
}

// Mock data for demonstration
const mockMessages: Chat[] = [
  {
    id: 1,
    created_at: new Date().toISOString(),
    room_id: 1,
    from: 'user123',
    chat: 'Hey there! How are you?'
  },
  {
    id: 2,
    created_at: new Date().toISOString(),
    room_id: 1,
    from: 'currentUser',
    chat: 'I\'m doing great, thanks for asking!'
  },
  {
    id: 3,
    created_at: new Date().toISOString(),
    room_id: 1,
    from: 'user123',
    chat: 'That\'s good to hear!'
  }
];

// Chat Container Component
export default function ChatContainer() {
  const currentUserId = 'currentUser'; // Mock current user ID

  return (
    <div className="flex-1 flex flex-col bg-[#313338] h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {mockMessages.map((message) => (
            <Message
              key={message.id}
              message={message}
              currentUser={currentUserId}
            />
          ))}
        </div>
      </div>
      
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
  );
}