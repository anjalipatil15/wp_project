import { Link } from "react-router-dom"
import "./DirectMessagesList.css"

const DMList = ({ friends = [], directMessages = [] }) => {

  const dmList = friends
    .filter((friend) => friend.FriendshipStatus === "Accepted")
    .map((friend) => {
      const lastMessage = directMessages.find(
        (dm) => dm.participants.includes(friend.UserID1) && dm.participants.includes(friend.UserID2),
      )

      return {
        userId: friend.UserID1,
        username: friend.Username || "User",
        avatar: friend.ProfilePicture,
        status: friend.OnlineStatus,
        lastMessage: lastMessage?.lastMessage || null,
        lastMessageTime: lastMessage?.timestamp || null,
      }
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
    <div className="dm-list">
      {dmList.length > 0 ? (
        dmList.map((dm) => (
          <Link key={dm.userId} to={`/direct-messages/${dm.userId}`} className="dm-item">
            <div className="dm-item__avatar">
              <img src={dm.avatar || "/placeholder.svg?height=32&width=32"} alt={dm.username} />
              <div className="dm-item__status" style={{ backgroundColor: getStatusColor(dm.status) }}></div>
            </div>
            <div className="dm-item__info">
              <div className="dm-item__name">{dm.username}</div>
              {dm.lastMessage && <div className="dm-item__last-message">{dm.lastMessage}</div>}
            </div>
          </Link>
        ))
      ) : (
        <div className="dm-empty">
          <p>No direct messages yet</p>
          <p>Add a friend to start chatting!</p>
        </div>
      )}
    </div>
  )
}

export default DMList

