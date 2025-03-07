import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function RoomChat() {
  return (
    <div className="flex h-screen w-full">
      {/* Info Panel - Similar to Discord's right panel */}
      <div className="w-80 bg-[#2B2D31] flex flex-col">
        <div className="p-4 border-b border-[#1E1F22]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#7A1CAC] flex items-center justify-center">
              <span className="text-2xl">🎭</span>
            </div>
            <h2 className="text-xl font-bold text-[#EBD3F8]">Room Name</h2>
          </div>
          <p className="text-[#a5a6a3] text-sm mb-6">
            This is a description of the room. Users can see what this room is about.
          </p>
          
          {/* Room Vote Section */}
          <div className="bg-[#313338] rounded-lg p-4">
            <p className="text-[#EBD3F8] mb-3 text-sm font-medium">Should this room stay?</p>
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
      <div className="flex-1 flex flex-col bg-[#313338]">
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="w-24 h-24 rounded-full bg-[#7A1CAC] flex items-center justify-center">
                <span className="text-4xl">💭</span>
              </div>
              <h1 className="text-2xl font-bold text-[#EBD3F8]">Welcome to the Room!</h1>
              <p className="text-[#a5a6a3] text-center">
                This is the beginning of the conversation.
                Keep it friendly and respectful!
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