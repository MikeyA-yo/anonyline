export default function ChatPage(){
    return (
        <>
          {/* <div className="bg-[#7A1CAC]">

          </div> */}
          <div className="flex flex-col h-screen w-full">
            <div className="flex-1 overflow-y-auto bg-[#313338] p-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <div className="w-24 h-24 rounded-full bg-[#7A1CAC] flex items-center justify-center">
                    <span className="text-4xl text-white">👋</span>
                  </div>
                  <h1 className="text-2xl font-bold text-white">Welcome to Anonyline!</h1>
                  <p className="text-gray-400 text-center">
                    This is the beginning of your anonymous chat experience.
                    Start a conversation or join existing ones!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#2B2D31] p-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Send a message..."
                    className="flex-1 bg-[#383A40] text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
                  />
                  <button className="bg-[#7A1CAC] text-white px-4 py-2 rounded-md hover:bg-[#6A189C] transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}