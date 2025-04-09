"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./DirectMessage.css"
import Sidebar from "../components/layout/Sidebar"
import MessageList from "../components/chat/MessageList"
import MessageInput from "../components/chat/MessageInput"
import { Phone, Video, UserPlus, Search, Info } from "lucide-react"

const DirectMessage = () => {
  const { userId } = useParams()
  const [currentUser, setCurrentUser] = useState(null)
  const [recipient, setRecipient] = useState(null)
  const [messages, setMessages] = useState([])
  const [servers, setServers] = useState([])
  const [friends, setFriends] = useState([])

  // Fetch user data, recipient data, and messages
  useEffect(() => {
    // Mock data for demonstration
    setCurrentUser({
      UserID: 1,
      Username: "CurrentUser",
      Email: "user@example.com",
      ProfilePicture: "/placeholder.svg?height=40&width=40",
      OnlineStatus: "Online",
    })

    setRecipient({
      UserID: Number.parseInt(userId),
      Username: "User " + userId,
      Email: `user${userId}@example.com`,
      ProfilePicture: "/placeholder.svg?height=40&width=40",
      OnlineStatus: "Online",
      AboutMe: "This is my about me section",
    })

    setServers([
      { ServerID: 1, ServerName: "Gaming Server", ServerOwnerID: 1 },
      { ServerID: 2, ServerName: "Study Group", ServerOwnerID: 2 },
      { ServerID: 3, ServerName: "Project Team", ServerOwnerID: 3 },
    ])

    setFriends([
      {
        UserID: 2,
        Username: "JaneDoe",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Online",
        FriendshipStatus: "Accepted",
        UserID1: 1,
        UserID2: 2,
      },
      {
        UserID: 3,
        Username: "JohnSmith",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Idle",
        FriendshipStatus: "Accepted",
        UserID1: 1,
        UserID2: 3,
      },
    ])

    // Mock messages
    const mockMessages = []
    const users = [
      { UserID: 1, Username: "CurrentUser", ProfilePicture: "/placeholder.svg?height=40&width=40" },
      {
        UserID: Number.parseInt(userId),
        Username: "User " + userId,
        ProfilePicture: "/placeholder.svg?height=40&width=40",
      },
    ]

    // Generate 20 mock messages
    for (let i = 1; i <= 20; i++) {
      const user = users[i % 2]
      const date = new Date()
      date.setMinutes(date.getMinutes() - i * 5)

      mockMessages.push({
        MessageID: i,
        ChannelID: null,
        UserID: user.UserID,
        Username: user.Username,
        ProfilePicture: user.ProfilePicture,
        MessageContent: `This is direct message #${i}.`,
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
  }, [userId])

  const handleSendMessage = (messageData) => {
    const newMessage = {
      MessageID: messages.length + 1,
      ChannelID: null,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "#3ba55d"
      case "Idle":
        return "#faa81a"
      case "Do Not Disturb":
        return "#ed4245"
      case "Offline":
      default:
        return "#747f8d"
    }
  }

  return (
    <div className="direct-message">
      <Sidebar servers={servers} currentUser={currentUser} friends={friends} />
      <div className="direct-message__content">
        <div className="direct-message__header">
          <div className="direct-message__user-info">
            <div className="direct-message__avatar">
              <img
                src={recipient?.ProfilePicture || "/placeholder.svg?height=32&width=32"}
                alt={recipient?.Username || "User"}
              />
              <div
                className="direct-message__status"
                style={{ backgroundColor: getStatusColor(recipient?.OnlineStatus) }}
              ></div>
            </div>
            <div className="direct-message__username">{recipient?.Username || "User"}</div>
          </div>
          <div className="direct-message__actions">
            <button className="direct-message__action" title="Start Voice Call">
              <Phone size={20} />
            </button>
            <button className="direct-message__action" title="Start Video Call">
              <Video size={20} />
            </button>
            <button className="direct-message__action" title="Add Friends to DM">
              <UserPlus size={20} />
            </button>
            <div className="direct-message__search">
              <Search size={16} />
              <input type="text" placeholder="Search" />
            </div>
            <button className="direct-message__action" title="User Info">
              <Info size={20} />
            </button>
          </div>
        </div>
        <div className="direct-message__main">
          <div className="direct-message__messages">
            <MessageList messages={messages} currentUser={currentUser} />
          </div>
        </div>
        <MessageInput onSendMessage={handleSendMessage} placeholder={`Message @${recipient?.Username || "User"}`} />
      </div>
    </div>
  )
}

export default DirectMessage

