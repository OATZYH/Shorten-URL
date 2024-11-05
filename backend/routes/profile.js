// routes/profile.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route   GET /api/profile
// @desc    Get authenticated user's profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Assuming req.user contains the authenticated user's data
    res.json({
      user: {
        id: req.user.user_id, // Adjust based on your User model
        username: req.user.username,
        is_admin: req.user.is_admin,
        created_at: req.user.created_at,
      },
    });
  }
);

module.exports = router;
