import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DMPage from "./components/DirectMessage";
import StaticChatPage from "./components/StaticChatPage";
import CreateServer from "./components/CreateServer";
import DirectMessages from "./components/DirectMessage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<StaticChatPage />} />
        <Route path="/dms" element={<DMPage />} />
        <Route path="/static" element={<StaticChatPage />} />
        <Route path="/Createserver" element={<CreateServer/>}/>
        <Route path="/dms/:channelId" element={<DirectMessages />} />
      </Routes>
    </Router>

  );
}

export default App;
