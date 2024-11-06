const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const urlController = require('../controllers/urlController');

// Apply to multiple routes
router.post('/', authenticateJWT, urlController.shortenURL);
router.get('/my-urls', authenticateJWT, urlController.getUserURLs);
router.delete('/:short_code', authenticateJWT, urlController.deleteURL);

// Public Route for Redirection
router.get('/:short_code', urlController.redirectURL);

module.exports = router;
