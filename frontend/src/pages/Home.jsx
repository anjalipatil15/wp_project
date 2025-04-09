"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"
import Sidebar from "../components/layout/Sidebar"
import FriendsList from "../components/friends/FriendsList"

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [servers, setServers] = useState([])
  const [friends, setFriends] = useState([])
  const navigate = useNavigate()

  // Fetch user data, servers, and friends
  useEffect(() => {
    // Mock data for demonstration
    setCurrentUser({
      UserID: 1,
      Username: "CurrentUser",
      Email: "user@example.com",
      ProfilePicture: "/placeholder.svg?height=40&width=40",
      OnlineStatus: "Online",
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
      {
        UserID: 4,
        Username: "AliceWonder",
        ProfilePicture: "/placeholder.svg?height=40&width=40",
        OnlineStatus: "Do Not Disturb",
        FriendshipStatus: "Pending",
        UserID1: 4,
        UserID2: 1,
      },
    ])
  }, [])

  const handleMessage = (userId) => {
    navigate(`/direct-messages/${userId}`)
  }

  const handleCall = (userId) => {
    // Handle voice call
    console.log(`Calling user ${userId}`)
  }

  const handleVideoCall = (userId) => {
    // Handle video call
    console.log(`Video calling user ${userId}`)
  }

  const handleAddFriend = (userId, action) => {
    // Handle add friend
    console.log(`${action} friend request for user ${userId}`)
  }

  const handleRemoveFriend = (userId) => {
    // Handle remove friend
    console.log(`Remove friend ${userId}`)
  }

  return (
    <div className="home">
      <Sidebar servers={servers} currentUser={currentUser} friends={friends} />
      <div className="home__content">
        <div className="home__header">
          <div className="home__header-title">Friends</div>
        </div>
        <div className="home__main">
          <FriendsList
            friends={friends}
            onMessage={handleMessage}
            onCall={handleCall}
            onVideoCall={handleVideoCall}
            onAddFriend={handleAddFriend}
            onRemoveFriend={handleRemoveFriend}
          />
        </div>
      </div>
    </div>
  )
}

export default Home

