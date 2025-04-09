const messageService = require('../services/messageService');
const channelService = require('../services/channelService');
const serverService = require('../services/serverService');
const attachmentService = require('../services/attachmentService');

module.exports = (io, socket) => {
  // Send a message
  socket.on('message:send', async (data) => {
    try {
      const { channelId, content, attachments = [] } = data;
      const userId = socket.user.id;
      
      // Check if channel exists
      const channels = await channelService.getChannelById(channelId);
      if (channels.length === 0) {
        return socket.emit('error', { message: 'Channel not found' });
      }
      
      const channel = channels[0];
      
      // Check if user is a member of the server
      const isMember = await serverService.isUserServerMember(userId, channel.ServerID);
      if (!isMember) {
        return socket.emit('error', { message: 'You are not a member of this server' });
      }
      
      // Create message
      const messageId = await messageService.createMessage({
        channelID: channelId,
        userID: userId,
        messageContent: content,
        messageDate: new Date()
      });
      
      // Handle attachments if any
      const savedAttachments = [];
      for (const attachment of attachments) {
        const attachmentId = await attachmentService.createAttachment({
          messageID: messageId,
          userID: userId,
          fileURL: attachment.fileURL,
          fileType: attachment.fileType,
          fileSize: attachment.fileSize,
          uploadDate: new Date()
        });
        
        savedAttachments.push({
          id: attachmentId,
          fileURL: attachment.fileURL,
          fileType: attachment.fileType,
          fileSize: attachment.fileSize
        });
      }
      
      // Get user info
      const users = await userService.getUserById(userId);
      const user = users[0];
      
      const messageData = {
        id: messageId,
        content,
        channelId,
        userId,
        username: user.Username,
        profilePicture: user.ProfilePicture,
        timestamp: new Date(),
        attachments: savedAttachments
      };
      
      // Broadcast to channel
      io.to(`channel:${channelId}`).emit('message:new', messageData);
      
      // Acknowledge receipt
      socket.emit('message:sent', { messageId });
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });
  
  // Edit a message
  socket.on('message:edit', async (data) => {
    try {
      const { messageId, content } = data;
      const userId = socket.user.id;
      
      // Check if message exists
      const messages = await messageService.getMessageById(messageId);
      if (messages.length === 0) {
        return socket.emit('error', { message: 'Message not found' });
      }
      
      const message = messages[0];
      
      // Check if user is the message author
      if (message.UserID !== userId) {
        return socket.emit('error', { message: 'You can only edit your own messages' });
      }
      
      // Update message
      const updated = await messageService.updateMessage(messageId, {
        MessageContent: content,
        EditDate: new Date()
      });
      
      if (!updated) {
        return socket.emit('error', { message: 'Failed to update message' });
      }
      
      const messageData = {
        id: messageId,
        content,
        editDate: new Date()
      };
      
      // Broadcast to channel
      io.to(`channel:${message.ChannelID}`).emit('message:update', messageData);
      
      // Acknowledge receipt
      socket.emit('message:edited', { messageId });
    } catch (error) {
      console.error('Error editing message:', error);
      socket.emit('error', { message: 'Failed to edit message' });
    }
  });
  
  // Delete a message
  socket.on('message:delete', async (data) => {
    try {
      const { messageId } = data;
      const userId = socket.user.id;
      
      // Check if message exists
      const messages = await messageService.getMessageById(messageId);
      if (messages.length === 0) {
        return socket.emit('error', { message: 'Message not found' });
      }
      
      const message = messages[0];
      
      // Check if user is the message author or has admin permissions
      if (message.UserID !== userId) {
        // Check if user is server owner or has admin role
        const channels = await channelService.getChannelById(message.ChannelID);
        const servers = await serverService.getServerById(channels[0].ServerID);
        
        if (servers[0].ServerOwnerID !== userId) {
          // TODO: Check if user has admin role
          return socket.emit('error', { message: 'You can only delete your own messages' });
        }
      }
      
      // Delete message
      const deleted = await messageService.deleteMessage(messageId);
      
      if (!deleted) {
        return socket.emit('error', { message: 'Failed to delete message' });
      }
      
      // Broadcast to channel
      io.to(`channel:${message.ChannelID}`).emit('message:delete', { messageId });
      
      // Acknowledge receipt
      socket.emit('message:deleted', { messageId });
    } catch (error) {
      console.error('Error deleting message:', error);
      socket.emit('error', { message: 'Failed to delete message' });
    }
  });
  
  // Typing indicator
  socket.on('typing:start', (data) => {
    const { channelId } = data;
    
    socket.to(`channel:${channelId}`).emit('typing:start', {
      userId: socket.user.id,
      username: socket.user.username,
      channelId
    });
  });
  
  socket.on('typing:stop', (data) => {
    const { channelId } = data;
    
    socket.to(`channel:${channelId}`).emit('typing:stop', {
      userId: socket.user.id,
      channelId
    });
  });
};