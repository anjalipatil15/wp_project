"use client"

import { useState } from "react"
import "./UserPanel.css"
import { Mic, Headphones, Cog } from "lucide-react"

const UserPanel = ({ currentUser = {} }) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)

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
    <div className="user-panel">
      <div className="user-panel__profile">
        <div className="user-panel__avatar">

        </div>
        <div className="user-panel__info">
          <div className="user-panel__username">{currentUser.Username || "User"}</div>
          <div className="user-panel__discriminator">#{currentUser.UserID || "0000"}</div>
        </div>
      </div>
      <div className="user-panel__actions">
        <button
          className={`user-panel__action ${isMuted ? "active" : ""}`}
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <Mic size={20} />
        </button>
        <button
          className={`user-panel__action ${isDeafened ? "active" : ""}`}
          onClick={() => setIsDeafened(!isDeafened)}
          title={isDeafened ? "Undeafen" : "Deafen"}
        >
          <Headphones size={20} />
        </button>
        <button className="user-panel__action" title="User Settings">
          <Cog size={20} />
        </button>
      </div>
    </div>
  )
}

export default UserPanel

