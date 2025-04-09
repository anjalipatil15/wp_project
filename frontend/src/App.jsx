"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Server from "./pages/Server"
import DirectMessage from "./pages/DirectMessage"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is authenticated
  useEffect(() => {
    // For demo purposes, we'll just set isAuthenticated to true
    // In a real app, you would check for a token in localStorage or cookies
    setIsAuthenticated(true)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/servers/:serverId" element={isAuthenticated ? <Server /> : <Navigate to="/login" />} />
        <Route
          path="/servers/:serverId/channels/:channelId"
          element={isAuthenticated ? <Server /> : <Navigate to="/login" />}
        />
        <Route
          path="/direct-messages/:userId"
          element={isAuthenticated ? <DirectMessage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App

