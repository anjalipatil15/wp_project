import React from "react"
import Sidebar from "../components/layouts/Sidebar"
import "./Dashboard.css"
import SeverList from "../components/layouts/ServerList"
import ChannelList from "../components/layouts/ChannelList"
import FriendsList from "../components/friends/FriendsList"
import "./FriendsList.css"
import "./ChannelList.css"
import "./ServerList.css"
import "./Sidebar.css"
import { Link } from "react-router-dom"


const Dashboard = () => {
  return (
    <nav className="Navbar">

    </nav>
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__sidebar">
        <h2>Servers</h2>
        <ServerList />
        <h2>Channels</h2>
        <ChannelList />
        <h2>Friends</h2>
        <FriendsList />
      </div>
      <div className="dashboard__content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Select a server or channel to get started.</p>
      </div>  
    </div>
  )
}

export default Dashboard
