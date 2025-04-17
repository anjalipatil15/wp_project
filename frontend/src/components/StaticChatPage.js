"use client"

import { useState } from "react"
import Groups from "./Groups"
import OnlineFriendsList from "./OnlineFriendsList"
import { MdKeyboardVoice } from "react-icons/md"
import { FaHeadphones } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import lmfao from '../photos/lmfao.jpg';

const StaticChatPage = () => {

  const [servers] = useState([
    { id: 1, name: "DS", isActive: true },
    { id: 2, name: "GM", isActive: false },
    { id: 3, name: "WB", isActive: false },
  ])

  const [channels] = useState([
    { id: 1, name: "general", type: "text", isActive: true },
    { id: 2, name: "help", type: "text", isActive: false },
    { id: 3, name: "resources", type: "text", isActive: false },
    { id: 4, name: "General", type: "voice", isActive: false },
    { id: 5, name: "Gaming", type: "voice", isActive: false },
  ])

  const [users] = useState([
    { id: 1, username: "User1", status: "Playing a game", isOnline: true },
    { id: 2, username: "User2", status: "Available", isOnline: true },
    { id: 3, username: "User3", status: "Working on a project", isOnline: true },
    { id: 4, username: "User4", status: "Offline", isOnline: false },
    { id: 5, username: "User5", status: "Offline", isOnline: false },
  ])

  const [messages] = useState([
    { id: 1, author: "User1", content: "Hey everyone! How are you doing today?", timestamp: "12:30 PM" },
    { id: 2, author: "User2", content: "Pretty good! Just working on my React project.", timestamp: "12:32 PM" },
    { id: 3, author: "User3", content: "Has anyone checked out the new documentation?", timestamp: "12:35 PM" },
    { id: 4, author: "User1", content: "Not yet, is it helpful?", timestamp: "12:36 PM" },
    { id: 5, author: "User3", content: "Yeah, it explains the new features really well.", timestamp: "12:38 PM" },
    { id: 6, author: "User2", content: "I'll check it out later today!", timestamp: "12:40 PM" },
    { id: 7, author: "System", content: "User4 has left the channel", timestamp: "12:45 PM", isSystem: true },
  ])


  const [activeServer, setActiveServer] = useState(1)
  const [activeChannel, setActiveChannel] = useState(1)
  const [messageInput, setMessageInput] = useState("")
  const [currentUser] = useState("YourUsername")

  const handleChannelClick = (channelId) => {
    setActiveChannel(channelId)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (messageInput.trim() === "") return

    setMessageInput("")
  }

  return (
    <div className="flex h-screen w-full font-[Whitney,Helvetica_Neue,Helvetica,Arial,sans-serif] text-[#dcddde]">
      <Groups />
            {/* Channel Sidebar */}
      <div className="w-[240px] bg-[#2f3136] flex flex-col">
        <div className="h-12 px-4 flex items-center shadow-[0_1px_0_rgba(4,4,5,0.2)]">
          <h3 className="text-base font-semibold">Discord Server</h3>
        </div>

        <div className="flex-1 p-[16px_8px] overflow-y-auto">
          <div className="uppercase text-xs font-semibold text-[#96989d] mb-1 px-2 mt-0">
            <span>TEXT CHANNELS</span>
          </div>

          {channels
            .filter((channel) => channel.type === "text")
            .map((channel) => (
              <div
                key={channel.id}
                className={`flex items-center py-[6px] px-2 rounded text-[#96989d] cursor-pointer mb-[2px] ${channel.isActive ? "bg-[rgba(79,84,92,0.6)] text-white" : "hover:bg-[rgba(79,84,92,0.3)] hover:text-[#dcddde]"}`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <span className="mr-[6px] text-xl">#</span>
                <span>{channel.name}</span>
              </div>
            ))}

          <div className="uppercase text-xs font-semibold text-[#96989d] mb-1 px-2 mt-4">
            <span>VOICE CHANNELS</span>
          </div>

          {channels
            .filter((channel) => channel.type === "voice")
            .map((channel) => (
              <div
                key={channel.id}
                className={`flex items-center py-[6px] px-2 rounded text-[#96989d] cursor-pointer mb-[2px] ${channel.isActive ? "bg-[rgba(79,84,92,0.6)] text-white" : "hover:bg-[rgba(79,84,92,0.3)] hover:text-[#dcddde]"}`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <span className="mr-[6px] text-xl">🔊</span>
                <span>{channel.name}</span>
              </div>
            ))}
        </div>

        {/* Profile Settings */}
        <div className="bg-[#292b2f] h-[5rem] flex text-white/80 items-center px-4 justify-between">
            <div className="flex items-center ">
              <img src={lmfao} alt="" className="w-12 h-12 rounded-full" />
              <div className=" pl-2">
                <p>Anjali</p>
                <p className="text-[14px] text-gray-400">#anju05</p>
              </div>
            </div>

            <div className=" flex space-x-3 text-[20px]">
              <MdKeyboardVoice />
              <FaHeadphones />
              <IoMdSettings className=" " />
            </div>
          </div>
        </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-[#36393f] flex flex-col">
        <div className="h-12 px-4 flex items-center shadow-[0_1px_0_rgba(4,4,5,0.2)]">
          <div className="flex items-center">
            <span className="mr-[6px] text-xl">#</span>
            <span>{channels.find((channel) => channel.id === activeChannel)?.name || "general"}</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={message.isSystem ? "text-center text-[#96989d] italic my-2" : "flex mb-4"}>
              {!message.isSystem && <div className="w-10 h-10 rounded-full bg-[#5865f2] mr-4 flex-shrink-0"></div>}
              <div className="flex-1">
                {!message.isSystem && (
                  <div className="flex items-baseline mb-1">
                    <span className="font-medium mr-2">{message.author}</span>
                    <span className="text-xs text-[#96989d]">{message.timestamp}</span>
                  </div>
                )}
                <div className="leading-[1.3]">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        <form className="px-4 pb-6 flex" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder={`Message #${channels.find((channel) => channel.id === activeChannel)?.name || "general"}`}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 bg-[#40444b] border-none text-[#dcddde] text-base outline-none py-[11px] px-4 rounded-lg mr-2 placeholder:text-[#96989d]"
          />
          <button
            type="submit"
            className="bg-[#5865f2] text-white border-none rounded px-4 cursor-pointer hover:bg-[#4752c4]"
          >
            Send
          </button>
        </form>
      </div>

      <OnlineFriendsList />
    </div>
  )
}

export default StaticChatPage
