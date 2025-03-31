import { User } from "@supabase/supabase-js";

export default function ChatPage({user}:{user:User}){

    // Format user ID to be more readable
    const userId = user.id.slice(0, 18);

    return (
        <>
          <div className="flex flex-col h-screen w-full">
            <div className="flex-1 overflow-y-auto bg-[#313338] p-4">
              <div className="max-w-2xl mx-auto">
                {/* Welcome Section */}
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <div className="w-24 h-24 rounded-full bg-[#7A1CAC] flex items-center justify-center">
                    <span className="text-4xl text-white">👋</span>
                  </div>
                  <h1 className="text-2xl font-bold text-center text-white">Welcome to Anonyline {userId}!</h1>
                  <p className="text-gray-400 text-center">
                    This is the beginning of your anonymous chat experience.
                    Start a conversation or join existing ones!
                  </p>
                </div>

                {/* Profile Section */}
                <div className="mt-8 bg-[#2B2D31] rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold text-white mb-4">Your Profile</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-gray-400 w-32">User ID:</span>
                      <span className="text-white font-mono bg-[#383A40] px-3 py-1 rounded">{userId}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-400 w-32">Status:</span>
                      <span className="text-green-400 flex items-center">
                        <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                        Active
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-400 w-32">Privacy Mode:</span>
                      <span className="text-purple-400">Anonymous</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <a 
                      href="/api/auth/signout"
                      className="bg-[#7A1CAC] text-white px-4 py-2 rounded-md hover:bg-[#6A189C] transition-colors inline-block"
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message Input Section - Keeping for consistency but with a different purpose */}
            <div className="bg-[#2B2D31] p-4">
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Update your status..."
                    className="flex-1 bg-[#383A40] text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
                  />
                  <button className="bg-[#7A1CAC] text-white px-4 py-2 rounded-md hover:bg-[#6A189C] transition-colors">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}