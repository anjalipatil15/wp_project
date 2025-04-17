import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getDMChannels,
  getDMMessages,
  sendDirectMessage,
} from "../services/dmService";

const DirectMessages = () => {
  const { channelId } = useParams();
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch DM channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await getDMChannels();
        setChannels(data.channels || []); // adapt to response shape
      } catch (err) {
        console.error("Failed to load DM channels:", err);
        setError("Failed to load DM channels.");
      }
    };
    fetchChannels();
  }, []);

  // Fetch messages for selected channel
  useEffect(() => {
    const fetchMessages = async () => {
      if (!channelId) return;

      try {
        const data = await getDMMessages(channelId);
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to load messages:", err);
        setError("Failed to load messages.");
      }
    };
    fetchMessages();
  }, [channelId]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!channelId) {
      alert("No channel selected.");
      return;
    }

    if (!messageContent.trim() && attachments.length === 0) return;

    try {
      await sendDirectMessage(channelId, messageContent, attachments);
      setMessageContent("");
      setAttachments([]);
      const updated = await getDMMessages(channelId);
      setMessages(updated.messages || []);
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send message.");
    }
  };

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  return (
    <div className="flex h-screen font-sans text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4">
        <h2 className="text-xl font-bold mb-4">Direct Messages</h2>
        <div className="space-y-2">
          {channels.map((channel) => (
            <Link
              key={channel.id}
              to={`/dms/${channel.id}`}
              className={`block p-2 rounded hover:bg-gray-700 ${
                channelId === String(channel.id) ? "bg-gray-700" : ""
              }`}
            >
              {channel.recipient?.username || "Unnamed User"}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 bg-gray-800 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.MessageID} className="mb-4">
                <div className="font-semibold">{msg.Username}</div>
                <div className="text-sm text-gray-300">{msg.messageContent}</div>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        {channelId && (
          <form onSubmit={handleSend} className="p-4 bg-gray-900 flex items-center gap-2">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="text-white"
            />
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-black rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default DirectMessages;
