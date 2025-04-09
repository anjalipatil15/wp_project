const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { initializeSocket } = require('./src/socket/socket');
const errorHandler = require('./src/middleware/errorHandler');
const db = require('./src/config/db');

// Routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const serverRoutes = require('./src/routes/serverRoutes');
const channelRoutes = require('./src/routes/channelRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const friendRoutes = require('./src/routes/friendRoutes');
const attachmentRoutes = require('./src/routes/attachmentRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Test database connection
db.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/attachments', attachmentRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});