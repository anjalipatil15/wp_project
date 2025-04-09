// controllers/serverController.js
const serverService = require('../services/serverService');
const fs = require('fs');

// Create a new server
exports.createServer = async (req, res, next) => {
  try {
    const { serverName, serverDescription } = req.body;
    const userId = req.user.id;
    
    // Validate input
    if (!serverName) {
      return res.status(400).json({ message: 'Server name is required' });
    }
    
    // Handle server icon if provided
    let serverIcon = null;
    if (req.file) {
      serverIcon = req.file.path;
    }
    
    // Create server
    const serverId = await serverService.createServer({
      serverName,
      serverDescription,
      serverOwnerID: userId,
      serverIcon,
      createDate: new Date()
    });
    
    // Create default channels
    await serverService.createChannel({
      serverID: serverId,
      channelName: 'general',
      channelType: 'Text',
      channelDescription: 'General discussion',
      isPrivate: false,
      channelOwnerID: userId
    });
    
    await serverService.createChannel({
      serverID: serverId,
      channelName: 'voice',
      channelType: 'Voice',
      channelDescription: 'Voice chat',
      isPrivate: false,
      channelOwnerID: userId
    });
    
    // Add owner as member with admin role
    await serverService.addMember(serverId, userId, 'Admin');
    
    res.status(201).json({
      message: 'Server created successfully',
      server: {
        id: serverId,
        name: serverName,
        description: serverDescription,
        icon: serverIcon,
        ownerId: userId
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all servers for a user
exports.getUserServers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const servers = await serverService.getUserServers(userId);
    
    res.status(200).json({ servers });
  } catch (error) {
    next(error);
  }
};

// Get server by ID
exports.getServerById = async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const userId = req.user.id;
    
    // Check if server exists
    const servers = await serverService.getServerById(serverId);
    if (servers.length === 0) {
      return res.status(404).json({ message: 'Server not found' });
    }
    
    const server = servers[0];
    
    // Check if user is a member
    const isMember = await serverService.isServerMember(serverId, userId);
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this server' });
    }
    
    res.status(200).json({ server });
  } catch (error) {
    next(error);
  }
};

// Update server
exports.updateServer = async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const { serverName, serverDescription } = req.body;
    const userId = req.user.id;
    
    // Check if server exists
    const servers = await serverService.getServerById(serverId);
    if (servers.length === 0) {
      return res.status(404).json({ message: 'Server not found' });
    }
    
    const server = servers[0];
    
    // Check if user is the owner
    if (server.ServerOwnerID !== userId) {
      return res.status(403).json({ message: 'Only the server owner can update the server' });
    }
    
    // Handle server icon if provided
    let serverIcon = undefined;
    if (req.file) {
      // Delete old icon if it exists
      if (server.ServerIcon && fs.existsSync(server.ServerIcon)) {
        fs.unlinkSync(server.ServerIcon);
      }
      
      serverIcon = req.file.path;
    }
    
    // Update server
    const updated = await serverService.updateServer(serverId, {
      ServerName: serverName,
      ServerDesc: serverDescription,
      ServerIcon: serverIcon
    });
    
    if (!updated) {
      return res.status(500).json({ message: 'Failed to update server' });
    }
    
    res.status(200).json({
      message: 'Server updated successfully',
      server: {
        id: serverId,
        name: serverName || server.ServerName,
        description: serverDescription || server.ServerDesc,
        icon: serverIcon || server.ServerIcon,
        ownerId: server.ServerOwnerID
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete server
exports.deleteServer = async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const userId = req.user.id;
    
    // Check if server exists
    const servers = await serverService.getServerById(serverId);
    if (servers.length === 0) {
      return res.status(404).json({ message: 'Server not found' });
    }
    
    const server = servers[0];
    
    // Check if user is the owner
    if (server.ServerOwnerID !== userId) {
      return res.status(403).json({ message: 'Only the server owner can delete the server' });
    }
    
    // Delete server
    const deleted = await serverService.deleteServer(serverId);
    
    if (!deleted) {
      return res.status(500).json({ message: 'Failed to delete server' });
    }
    
    // Delete server icon if it exists
    if (server.ServerIcon && fs.existsSync(server.ServerIcon)) {
      fs.unlinkSync(server.ServerIcon);
    }
    
    res.status(200).json({
      message: 'Server deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Create server invite
exports.createInvite = async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const userId = req.user.id;
    
    // Check if server exists
    const servers = await serverService.getServerById(serverId);
    if (servers.length === 0) {
      return res.status(404).json({ message: 'Server not found' });
    }
    
    // Check if user is a member
    const isMember = await serverService.isServerMember(serverId, userId);
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this server' });
    }
    
    // Generate invite code
    const inviteCode = Math.random().toString(36).substring(2, 10);
    
    // Save invite
    await serverService.createInvite({
      serverID: serverId,
      inviteCode,
      creatorID: userId,
      createDate: new Date(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });
    
    res.status(201).json({
      message: 'Invite created successfully',
      invite: {
        code: inviteCode,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Join server with invite code
exports.joinServer = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    const userId = req.user.id;
    
    // Check if invite exists and is valid
    const invites = await serverService.getInviteByCode(inviteCode);
    if (invites.length === 0) {
      return res.status(404).json({ message: 'Invalid invite code' });
    }
    
    const invite = invites[0];
    
    // Check if invite has expired
    if (new Date(invite.ExpiryDate) < new Date()) {
      return res.status(400).json({ message: 'Invite has expired' });
    }
    
    const serverId = invite.ServerID;
    
    // Check if user is already a member
    const isMember = await serverService.isServerMember(serverId, userId);
    if (isMember) {
      return res.status(400).json({ message: 'You are already a member of this server' });
    }
    
    // Add user as member
    await serverService.addMember(serverId, userId, 'Member');
    
    // Get server details
    const servers = await serverService.getServerById(serverId);
    const server = servers[0];
    
    res.status(200).json({
      message: 'Joined server successfully',
      server: {
        id: serverId,
        name: server.ServerName,
        description: server.ServerDesc,
        icon: server.ServerIcon,
        ownerId: server.ServerOwnerID
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get server members
exports.getServerMembers = async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const userId = req.user.id;
    
    // Check if server exists
    const servers = await serverService.getServerById(serverId);
    if (servers.length === 0) {
      return res.status(404).json({ message: 'Server not found' });
    }
    
    // Check if user is a member
    const isMember = await serverService.isServerMember(serverId, userId);
    if (!isMember) {
      return res.status(403).json({ message: 'You are not a member of this server' });
    }
    
    // Get members
    const members = await serverService.getServerMembers(serverId);
    
    res.status(200).json({ members });
  } catch (error) {
    next(error);
  }
};