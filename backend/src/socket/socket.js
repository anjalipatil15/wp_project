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
  
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const users = await userService.getUserById(decoded.id);
      if (users.length === 0) {
        return next(new Error('User not found'));
      }

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

    userService.updateUser(socket.user.id, { OnlineStatus: 'Online' })
      .then(() => {

        socket.broadcast.emit('user:status', {
          userId: socket.user.id,
          status: 'Online'
        });
      })
      .catch(err => console.error('Error updating user status:', err));

    socket.join(`user:${socket.user.id}`);

    socket.on('join:server', (serverId) => {
      socket.join(`server:${serverId}`);
    });

    socket.on('join:channel', (channelId) => {
      socket.join(`channel:${channelId}`);
    });

    messageHandlers(io, socket);

    voiceHandlers(io, socket);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.username} (${socket.user.id})`);

      userService.updateUser(socket.user.id, { OnlineStatus: 'Offline' })
        .then(() => {

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