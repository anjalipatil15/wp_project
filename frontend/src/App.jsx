"use client"
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import API from "./api/axios" 
import "./App.css"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Server from "./pages/Server"
import DirectMessage from "./pages/DirectMessage"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const res = await API.get("/authRoutes") 
        setIsAuthenticated(res.data.authenticated) 
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={ <Home/>} />
        <Route path="/servers/:serverId" element={<Server /> } />
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
