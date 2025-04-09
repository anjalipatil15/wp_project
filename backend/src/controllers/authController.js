const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const userService = require('../services/userService');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const existingUsername = await userService.getUserByUsername(username);
    if (existingUsername.length > 0) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userId = await authService.createUser({
      username,
      email,
      password: hashedPassword,
      joinDate: new Date(),
      onlineStatus: 'Offline'
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userId,
        username,
        email
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const users = await userService.getUserByEmail(email);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login date and online status
    await userService.updateUser(user.UserID, {
      LastLoginDate: new Date(),
      OnlineStatus: 'Online'
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.UserID },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.UserID,
        username: user.Username,
        email: user.Email,
        profilePicture: user.ProfilePicture,
        onlineStatus: 'Online'
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const users = await userService.getUserById(userId);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    res.status(200).json({
      user: {
        id: user.UserID,
        username: user.Username,
        email: user.Email,
        profilePicture: user.ProfilePicture,
        aboutMe: user.AboutMe,
        status: user.Status,
        onlineStatus: user.OnlineStatus,
        joinDate: user.JoinDate
      }
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
exports.logout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Update online status
    await userService.updateUser(userId, {
      OnlineStatus: 'Offline'
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};