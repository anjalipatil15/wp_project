import React, { useState } from "react"

const OnlineFriendsList = ({ friends }) => {
  const sampleFriends = [
    { id: 1, username: "JohnDoe", status: "Playing Valorant", isOnline: true, avatarUrl: null },
    { id: 2, username: "AliceWonder", status: "Online", isOnline: true, avatarUrl: null },
    { id: 3, username: "BobSmith", status: "In a meeting", isOnline: true, avatarUrl: null },
    { id: 4, username: "EmilyTech", status: "Coding", isOnline: true, avatarUrl: null },
    { id: 5, username: "SamWilson", status: "Offline", isOnline: false, avatarUrl: null },
    { id: 6, username: "JennyLarson", status: "Offline", isOnline: false, avatarUrl: null },
  ]

  const [displayFriends] = useState(friends || sampleFriends)

  // Filter online and offline friends
  const onlineFriends = displayFriends.filter((friend) => friend.isOnline)
  const offlineFriends = displayFriends.filter((friend) => !friend.isOnline)

  return (
    <div className="fixed top-0 right-0 w-[240px] h-screen bg-[#2f3136] overflow-y-auto border-l border-[#202225] z-[1000]">
      {/* Online Friends Section */}
      <div className="p-4 text-xs text-[#96989d] font-semibold">
        <h3>ONLINE — {onlineFriends.length}</h3>
      </div>

      <div className="px-2">
        {onlineFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center p-[6px_8px] rounded cursor-pointer mb-[2px] transition-all duration-200 hover:bg-[rgba(79,84,92,0.3)]"
          >
            <div className="w-8 h-8 rounded-full bg-[#5865f2] mr-2 flex-shrink-0"></div>
            <div className="flex-1 overflow-hidden">
              <div className="font-medium text-sm text-[#dcddde] flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="inline-block w-2 h-2 rounded-full bg-[#3ba55d] mr-1"></span>
                {friend.username}
              </div>
              <div className="text-xs text-[#b9bbbe] whitespace-nowrap overflow-hidden text-ellipsis">
                {friend.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offline Friends Section */}
      <div className="p-4 text-xs text-[#96989d] font-semibold">
        <h3>OFFLINE — {offlineFriends.length}</h3>
      </div>

      <div className="px-2">
        {offlineFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center p-[6px_8px] rounded cursor-pointer mb-[2px] transition-all duration-200 hover:bg-[rgba(79,84,92,0.3)]"
          >
            <div className="w-8 h-8 rounded-full bg-[#5865f2] mr-2 flex-shrink-0"></div>
            <div className="flex-1 overflow-hidden">
              <div className="font-medium text-sm text-[#dcddde] flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="inline-block w-2 h-2 rounded-full bg-[#747f8d] mr-1"></span>
                {friend.username}
              </div>
              <div className="text-xs text-[#b9bbbe] whitespace-nowrap overflow-hidden text-ellipsis">
                {friend.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnlineFriendsList
