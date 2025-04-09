const messageService = require("../services/messageService");
const channelService = require("../services/channelService");
const serverService = require("../services/serverService");
const attachmentService = require("../services/attachmentService");

// Send a message
exports.sendMessage = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const { content, attachments } = req.body; // Assuming attachments are sent in req.body
    const userId = req.user.id;

    // Validate message content
    if (!content && (!attachments || attachments.length === 0)) {
      return res.status(400).json({ message: "Message content cannot be empty" });
    }

    // Check if the channel exists
    const channels = await channelService.getChannelById(channelId);
    if (!channels || channels.length === 0) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const channel = channels[0];

    // Check if user is a member of the server
    const isMember = await serverService.isUserServerMember(userId, channel.ServerID);
    if (!isMember) {
      return res.status(403).json({ message: "You are not a member of this server" });
    }

    // Check if the channel is private and verify access
    if (channel.IsPrivate) {
      const servers = await serverService.getServerById(channel.ServerID);
      if (!servers || servers.length === 0) {
        return res.status(404).json({ message: "Server not found" });
      }

      const server = servers[0];

      // Check if user is allowed in a private channel
      const hasAccess = await channelService.hasAccessToPrivateChannel(userId, channelId);
      if (!hasAccess && server.ServerOwnerID !== userId) {
        return res.status(403).json({ message: "You do not have access to this private channel" });
      }
    }

    // Save message to database
    const messageData = {
      content,
      userId,
      channelId,
      createdAt: new Date(),
    };

    const message = await messageService.createMessage(messageData);

    // Handle attachments (if any)
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        await attachmentService.saveAttachment({
          messageId: message.id,
          url: attachment.url,
          type: attachment.type, // e.g., "image", "video", "file"
        });
      }
    }

    // Respond with the created message
    res.status(201).json({ message, attachments });
  } catch (error) {
    console.error("Error sending message:", error);
    next(error);
  }
};
