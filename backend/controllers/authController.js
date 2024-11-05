const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
    const { username, password, is_admin } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create(username, hashedPassword, is_admin || false);

        // Generate JWT
        const payload = {
            id: newUser.user_id,
            username: newUser.username,
            is_admin: newUser.is_admin,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            token: 'Bearer ' + token,
            user: {
                id: newUser.user_id,
                username: newUser.username,
                is_admin: newUser.is_admin,
                created_at: newUser.created_at,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Compare two strings
function compareStrings (string1, string2) {
    return string1 === string2;
};
// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check for existing user
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(400).json({ msg: 'User doesn not exist' });
        }

        // Validate password
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = compareStrings(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'password incorrect' });
        }

        // Generate JWT
        const payload = {
            id: user.user_id,
            username: user.username,
            is_admin: user.is_admin,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token: 'Bearer ' + token,
            user: {
                id: user.user_id,
                username: user.username,
                is_admin: user.is_admin,
                created_at: user.created_at,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

