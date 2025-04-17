const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Send a message
router.post('/channels/:channelId/messages', messageController.sendMessage);

// Get messages in a channel
router.get('/channels/:channelId/messages', messageController.getChannelMessages);

// Edit a message
router.put('/messages/:messageId',  messageController.editMessage);

// Delete a message
router.delete('/messages/:messageId',  messageController.deleteMessage);

// Pin a message
router.post('/messages/:messageId/pin',  messageController.pinMessage);

// Unpin a message
router.delete('/messages/:messageId/pin',  messageController.unpinMessage);

// Get pinned messages in a channel
router.get('/channels/:channelId/pins',  messageController.getPinnedMessages);

// React to a message
router.post('/messages/:messageId/reactions',  messageController.addReaction);

// Remove reaction from a message
router.delete('/messages/:messageId/reactions/:reactionId', messageController.removeReaction);

// Get reactions for a message
router.get('/messages/:messageId/reactions',  messageController.getReactions);

module.exports = router;