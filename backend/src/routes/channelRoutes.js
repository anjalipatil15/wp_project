const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const auth = require('../middleware/auth');

// Create a new channel
router.post('/servers/:serverId/channels', auth, channelController.createChannel);

// Get all channels in a server
router.get('/servers/:serverId/channels', auth, channelController.getServerChannels);

// Get channel by ID
router.get('/channels/:channelId', auth, channelController.getChannelById);

// Update channel
router.put('/channels/:channelId', auth, channelController.updateChannel);

// Delete channel
router.delete('/channels/:channelId', auth, channelController.deleteChannel);


module.exports = router;