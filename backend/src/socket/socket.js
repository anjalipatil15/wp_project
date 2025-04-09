const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const messageHandlers = require('./messageHandlers');
const voiceHandlers = require('./voiceHandlers');

let io;

exports.initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || '*',
      methods: ['GET', 'POST']
    }
  });
  
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user exists
      const users = await userService.getUserById(decoded.id);
      if (users.length === 0) {
        return next(new Error('User not found'));
      }
      
      // Set user data in socket
      socket.user = {
        id: users[0].UserID,
        username: users[0].Username
      };
      
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });
  
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.username} (${socket.user.id})`);
    
    // Update user's online status
    userService.updateUser(socket.user.id, { OnlineStatus: 'Online' })
      .then(() => {
        // Broadcast to friends that user is online
        socket.broadcast.emit('user:status', {
          userId: socket.user.id,
          status: 'Online'
        });
      })
      .catch(err => console.error('Error updating user status:', err));
    
    // Join user's personal room for direct messages
    socket.join(`user:${socket.user.id}`);
    
    // Handle joining server channels
    socket.on('join:server', (serverId) => {
      socket.join(`server:${serverId}`);
    });
    
    // Handle joining specific channels
    socket.on('join:channel', (channelId) => {
      socket.join(`channel:${channelId}`);
    });
    
    // Handle message events
    messageHandlers(io, socket);
    
    // Handle voice chat events
    voiceHandlers(io, socket);
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.username} (${socket.user.id})`);
      
      // Update user's online status
      userService.updateUser(socket.user.id, { OnlineStatus: 'Offline' })
        .then(() => {
          // Broadcast to friends that user is offline
          socket.broadcast.emit('user:status', {
            userId: socket.user.id,
            status: 'Offline'
          });
        })
        .catch(err => console.error('Error updating user status:', err));
    });
  });
  
  return io;
};

exports.getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};