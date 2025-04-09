const express = require('express');
const router = express.Router();
const dmController = require('../controllers/dmController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Start or get DM channel
router.post('/users/:userId', auth, dmController.getOrCreateDMChannel);

// Get all DM channels for a user
router.get('/', auth, dmController.getUserDMChannels);

// Send a direct message
router.post('/:channelId/messages', auth, upload.array('attachments', 5), dmController.sendDirectMessage);

// Get messages in a DM channel
router.get('/:channelId/messages', auth, dmController.getDMMessages);

// Create group DM
router.post('/group', auth, dmController.createGroupDM);

// Add user to group DM
router.post('/:channelId/users', auth, dmController.addUserToGroupDM);

// Remove user from group DM
router.delete('/:channelId/users/:userId', auth, dmController.removeUserFromGroupDM);

module.exports = router;