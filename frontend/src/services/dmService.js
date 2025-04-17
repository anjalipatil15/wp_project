const API_URL = "http://localhost:5000/api/dms"; // Pointing to your backend DM routes

export const getDMChannels = async () => {
  const res = await fetch(`${API_URL}/`);
  if (!res.ok) throw new Error("Failed to fetch DM channels");
  return await res.json();
};

export const getDMMessages = async (channelId) => {
  const res = await fetch(`${API_URL}/${channelId}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return await res.json();
};

export const sendDirectMessage = async (channelId, content, attachments = []) => {
  const formData = new FormData();
  formData.append("content", content);
  attachments.forEach((file) => formData.append("attachments", file));

  const res = await fetch(`${API_URL}/${channelId}/messages`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to send message");
  return await res.json();
};
