import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
import FriendsList from "./FriendsList";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friendlist" element={<FriendsList />} />
       </Routes>
    </Router>
  )
}

export default App

