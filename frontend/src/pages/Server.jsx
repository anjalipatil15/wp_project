"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Server.css"
import Sidebar from "../components/layout/Sidebar"
import MessageList from "../components/chat/MessageList"
import MessageInput from "../components/chat/MessageInput"

const Server = () => {
  const { serverId, channelId } = useParams()
  const [currentUser, setCurrentUser] = useState(null)
  const [server, setServer] = useState(null)
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])
  const [members, setMembers] = useState([])

  // Fetch server data, channels, and messages
  useEffect(() => {
    // Mock data for demonstration
    setCurrentUser({
      UserID: 1,
      Username: "CurrentUser",
      Email: "user@example.com",
      ProfilePicture: "/placeholder.svg?height=40&width=40",
      OnlineStatus: "Online",
    })

    setServer({
      ServerID: Number.parseInt(serverId),
      ServerName: "Server " + serverId,
      ServerOwnerID: 1,
      ServerDesc: "This is a server description",
    })

    setChannels([
      {
        ChannelID: 101,
        ServerID: Number.parseInt(serverId),
        ChannelName: "general",
        ChannelType: "Text",
        ChannelDescription: "General discussion",
        IsPrivate: false,
        ChannelOwnerID: 1,
      },
      {
        ChannelID: 102,
        ServerID: Number.parseInt(serverId),
        ChannelName: "announcements",
        ChannelType: "Announcement",
        ChannelDescription: "Important announcements",
        IsPrivate: false,
        ChannelOwnerID: 1,
      },
      {
        ChannelID: 103,
        ServerID: Number.parseInt(serverId),
        ChannelName: "voice-chat",
        ChannelType: "Voice",
        ChannelDescription: "Voice chat channel",
        IsPrivate: false,
        ChannelOwnerID: 1,
      },
      {
        ChannelID: 104,
        ServerID: Number.parseInt(serverId),
        ChannelName: "moderators-only",
        ChannelType: "Text",
        ChannelDescription: "Private channel for moderators",
        IsPrivate: true,
        ChannelOwnerID: 1,
      },
    ])

    // Mock messages for the selected channel
    const mockMessages = []
    const users = [
      { UserID: 1, Username: "CurrentUser", ProfilePicture: "/placeholder.svg?height=40&width=40" },
      { UserID: 2, Username: "JaneDoe", ProfilePicture: "/placeholder.svg?height=40&width=40" },
      { UserID: 3, Username: "JohnSmith", ProfilePicture: "/placeholder.svg?height=40&width=40" },
    ]

    // Generate 20 mock messages
    for (let i = 1; i <= 20; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const date = new Date()
      date.setMinutes(date.getMinutes() - i * 5)

      mockMessages.push({
        MessageID: i,
        ChannelID: channelId ? Number.parseInt(channelId) : 101,
        UserID: user.UserID,
        Username: user.Username,
        ProfilePicture: user.ProfilePicture,
        MessageContent: `This is message #${i} in this channel.`,
        MessageDate: date.toISOString(),
        EditDate: i % 5 === 0 ? new Date(date.getTime() + 60000).toISOString() : null,
        Attachments:
          i % 7 === 0
            ? [
                {
                  AttachmentID: i * 10,
                  MessageID: i,
                  UserID: user.UserID,
                  FileURL: "/placeholder.svg?height=300&width=400",
                  FileType: "Image",
                  FileSize: 1024 * 1024 * Math.random(),
                  UploadDate: date.toISOString(),
                },
              ]
            : [],
      })
    }

    setMessages(mockMessages.reverse())

    // Mock server members
    setMembers([
      {
        UserID: 1,
        Username: "CurrentUser",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Online",
        Roles: ["Owner", "Admin"],
      },
      {
        UserID: 2,
        Username: "JaneDoe",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Online",
        Roles: ["Moderator"],
      },
      {
        UserID: 3,
        Username: "JohnSmith",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Idle",
        Roles: ["Member"],
      },
      {
        UserID: 4,
        Username: "AliceWonder",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Do Not Disturb",
        Roles: ["Member"],
      },
      {
        UserID: 5,
        Username: "BobBuilder",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Offline",
        Roles: ["Member"],
      },
    ])
  }, [serverId, channelId])

  const handleSendMessage = (messageData) => {
    const newMessage = {
      MessageID: messages.length + 1,
      ChannelID: channelId ? Number.parseInt(channelId) : 101,
      UserID: currentUser.UserID,
      Username: currentUser.Username,
      ProfilePicture: currentUser.ProfilePicture,
      MessageContent: messageData.content,
      MessageDate: new Date().toISOString(),
      EditDate: null,
      Attachments: messageData.attachments.map((attachment, index) => ({
        AttachmentID: (messages.length + 1) * 10 + index,
        MessageID: messages.length + 1,
        UserID: currentUser.UserID,
        FileURL: attachment.url,
        FileType: attachment.type,
        FileSize: attachment.size,
        UploadDate: new Date().toISOString(),
      })),
    }

    setMessages([...messages, newMessage])
  }

  // Find the active channel
  const activeChannel = channels.find((channel) => channel.ChannelID === (channelId ? Number.parseInt(channelId) : 101))

  return (
    <div className="server">
      <Sidebar
        servers={[{ ServerID: Number.parseInt(serverId), ServerName: server?.ServerName || "Server" }]}
        activeServerId={Number.parseInt(serverId)}
        channels={channels}
        currentUser={currentUser}
      />
      <div className="server__content">
        <div className="server__header">
          <div className="server__channel-info">
            <div className="server__channel-icon">
              {activeChannel?.ChannelType === "Text" ? "#" : activeChannel?.ChannelType === "Voice" ? "🔊" : "📢"}
            </div>
            <div className="server__channel-name">{activeChannel?.ChannelName || "channel"}</div>
            {activeChannel?.ChannelDescription && (
              <>
                <div className="server__channel-divider"></div>
                <div className="server__channel-description">{activeChannel.ChannelDescription}</div>
              </>
            )}
          </div>
        </div>
        <div className="server__main">
          <div className="server__messages">
            <MessageList messages={messages} currentUser={currentUser} />
          </div>
          <div className="server__sidebar">
            <div className="server__members">
              <div className="server__members-header">
                <h3>MEMBERS — {members.length}</h3>
              </div>
              <div className="server__members-list">
                {/* Group members by role and online status */}
                {["Online", "Idle", "Do Not Disturb", "Offline"].map((status) => {
                  const statusMembers = members.filter((member) => member.OnlineStatus === status)
                  if (statusMembers.length === 0) return null

                  return (
                    <div key={status} className="server__members-group">
                      <div className="server__members-status">
                        {status} — {statusMembers.length}
                      </div>
                      {statusMembers.map((member) => (
                        <div key={member.UserID} className="server__member">
                          <div className="server__member-avatar">
                            <img src={member.ProfilePicture || "/placeholder.svg"} alt={member.Username} />
                            <div
                              className="server__member-status"
                              style={{
                                backgroundColor:
                                  status === "Online"
                                    ? "#3ba55d"
                                    : status === "Idle"
                                      ? "#faa81a"
                                      : status === "Do Not Disturb"
                                        ? "#ed4245"
                                        : "#747f8d",
                              }}
                            ></div>
                          </div>
                          <div className="server__member-info">
                            <div className="server__member-name">
                              {member.Username}
                              {member.Roles.includes("Owner") && <span className="server__member-badge">👑</span>}
                            </div>
                            {member.Roles.length > 0 && !member.Roles.includes("Member") && (
                              <div className="server__member-role">
                                {member.Roles.filter((role) => role !== "Owner").join(", ")}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <MessageInput
          onSendMessage={handleSendMessage}
          channelName={activeChannel?.ChannelName || "channel"}
          placeholder={`Message #${activeChannel?.ChannelName || "channel"}`}
        />
      </div>
    </div>
  )
}

export default Server

