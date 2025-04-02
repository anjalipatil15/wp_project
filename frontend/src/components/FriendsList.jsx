"use client"

import { useState } from "react"
import "./FriendsList.css"
import { UserPlus, Search, MoreHorizontal, MessageSquare, Phone, Video, Trash } from "lucide-react"

const FriendsList = ({ friends = [], onAddFriend, onRemoveFriend, onMessage, onCall, onVideoCall }) => {
  const [activeTab, setActiveTab] = useState("online")
  const [searchQuery, setSearchQuery] = useState("")

  const tabs = [
    { id: "online", label: "Online" },
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "blocked", label: "Blocked" },
    { id: "add", label: "Add Friend", icon: <UserPlus size={16} /> },
  ]

  const filteredFriends = friends.filter((friend) => {
    // Filter by tab
    if (activeTab === "online" && friend.OnlineStatus !== "Online") return false
    if (activeTab === "pending" && friend.FriendshipStatus !== "Pending") return false
    if (activeTab === "blocked" && friend.FriendshipStatus !== "Blocked") return false

    // Filter by search
    if (searchQuery && !friend.Username.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

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
    <div className="friends-list">
      <div className="friends-list__header">
        <div className="friends-list__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`friends-list__tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon && <span className="friends-list__tab-icon">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="friends-list__search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="friends-list__content">
        {activeTab === "add" ? (
          <div className="friends-list__add-friend">
            <h2>ADD FRIEND</h2>
            <p>You can add a friend with their Discord Tag. It's cAsE sEnSiTiVe!</p>
            <div className="friends-list__add-form">
              <input type="text" placeholder="Enter a Username#0000" />
              <button>Send Friend Request</button>
            </div>
          </div>
        ) : (
          <>
            <div className="friends-list__section-header">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} — {filteredFriends.length}
            </div>
            <div className="friends-list__items">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <div key={friend.UserID} className="friend-item">
                    <div className="friend-item__avatar">
                      <img src={friend.ProfilePicture || "/placeholder.svg?height=40&width=40"} alt={friend.Username} />
                      <div
                        className="friend-item__status"
                        style={{ backgroundColor: getStatusColor(friend.OnlineStatus) }}
                      ></div>
                    </div>
                    <div className="friend-item__info">
                      <div className="friend-item__name">{friend.Username}</div>
                      <div className="friend-item__status-text">
                        {friend.OnlineStatus === "Online"
                          ? "Online"
                          : friend.OnlineStatus === "Idle"
                            ? "Idle"
                            : friend.OnlineStatus === "Do Not Disturb"
                              ? "Do Not Disturb"
                              : "Offline"}
                      </div>
                    </div>
                    <div className="friend-item__actions">
                      {friend.FriendshipStatus === "Accepted" && (
                        <>
                          <button
                            className="friend-item__action"
                            onClick={() => onMessage && onMessage(friend.UserID)}
                            title="Message"
                          >
                            <MessageSquare size={20} />
                          </button>
                          <button
                            className="friend-item__action"
                            onClick={() => onCall && onCall(friend.UserID)}
                            title="Call"
                          >
                            <Phone size={20} />
                          </button>
                          <button
                            className="friend-item__action"
                            onClick={() => onVideoCall && onVideoCall(friend.UserID)}
                            title="Video Call"
                          >
                            <Video size={20} />
                          </button>
                        </>
                      )}
                      {friend.FriendshipStatus === "Pending" && (
                        <>
                          <button
                            className="friend-item__action friend-item__action--accept"
                            onClick={() => onAddFriend && onAddFriend(friend.UserID, "accept")}
                            title="Accept"
                          >
                            ✓
                          </button>
                          <button
                            className="friend-item__action friend-item__action--decline"
                            onClick={() => onAddFriend && onAddFriend(friend.UserID, "decline")}
                            title="Decline"
                          >
                            ✕
                          </button>
                        </>
                      )}
                      <button
                        className="friend-item__action"
                        onClick={() => onRemoveFriend && onRemoveFriend(friend.UserID)}
                        title={friend.FriendshipStatus === "Blocked" ? "Unblock" : "Remove Friend"}
                      >
                        {friend.FriendshipStatus === "Blocked" ? "🔓" : <Trash size={20} />}
                      </button>
                      <button className="friend-item__action" title="More">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="friends-list__empty">
                  <div className="friends-list__empty-image">
                    <img src="/placeholder.svg?height=200&width=200" alt="No friends" />
                  </div>
                  <div className="friends-list__empty-text">
                    {activeTab === "online"
                      ? "No one is around to play with."
                      : activeTab === "pending"
                        ? "There are no pending friend requests."
                        : activeTab === "blocked"
                          ? "You haven't blocked anyone."
                          : "You don't have any friends yet."}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FriendsList

