const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Generate JWT Token
const generateToken = (user) => {
  const payload = {
    user_id: user.user_id,
    username: user.username,
    is_admin: user.is_admin,
  };
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
  const options = {
    expiresIn: '12h', 
  };
  return jwt.sign(payload, secret, options);
};

// Register 
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    const user = await User.create(username, password);
    const token = generateToken(user);
    res.status(201).json({ message: 'User registered successfully', token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ message: 'Logged in successfully', token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get Current User
exports.getUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ user: req.user });
};
