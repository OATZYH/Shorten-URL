const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const urlController = require('../controllers/urlController');

// @route   GET /api/protected/profile
// @desc    Get user profile
// @access  Private
router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            user: {
                id: req.user.user_id,
                username: req.user.username,
                is_admin: req.user.is_admin,
                created_at: req.user.created_at,
            },
        });
    }
);

// @route   POST /api/protected/shorten
// @desc    Shorten a long URL
// @access  Private
router.post(
    '/shorten',
    passport.authenticate('jwt', { session: false }),
    urlController.shortenURL
);

// @route   GET /api/protected/urls
// @desc    Get all URLs for the authenticated user
// @access  Private
router.get(
    '/urls',
    passport.authenticate('jwt', { session: false }),
    urlController.getUserURLs
);

// @route   DELETE /api/protected/urls/:short_code
// @desc    Delete a specific short URL
// @access  Private/Admin or Owner
router.delete(
    '/urls/:short_code',
    passport.authenticate('jwt', { session: false }),
    urlController.deleteURL
);

// @route   GET /:short_code
// @desc    Redirect to the original long URL
// @access  Public
router.get('/:short_code', urlController.redirectURL);

module.exports = router;
