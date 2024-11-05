const URL = require('../models/URL');

// Generate Base62 Short Code
const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const encodeBase62 = (num) => {
    let encoded = '';
    if (num === 0) return BASE62[0];
    while (num > 0) {
        encoded = BASE62[num % 62] + encoded;
        num = Math.floor(num / 62);
    }
    return encoded;
};

// Shorten URL
exports.shortenURL = async (req, res) => {
    const { long_url } = req.body;
    const user_id = req.user.user_id;

    if (!long_url) {
        return res.status(400).json({ msg: 'Please provide a long URL' });
    }

    try {
        // Insert the long URL without short_code to get url_id
        const insertQuery = `
            INSERT INTO urls (long_url, user_id)
            VALUES ($1, $2)
            RETURNING url_id
        `;
        const insertRes = await URL.createWithoutShortCode(long_url, user_id);
        const url_id = insertRes.url_id;

        // Generate short_code using Base62 encoding of url_id
        const short_code = encodeBase62(url_id);

        // Update the record with the short_code
        const updateRes = await URL.updateShortCode(short_code, url_id);

        res.status(201).json({
            short_url: `http://localhost:${process.env.PORT || 5000}/${short_code}`,
            long_url: long_url,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Redirect to Long URL
exports.redirectURL = async (req, res) => {
    const { short_code } = req.params;

    try {
        const urlRecord = await URL.findByShortCode(short_code);
        if (!urlRecord) {
            return res.status(404).json({ msg: 'URL not found' });
        }

        // Here you might want to log the access, increment a counter, etc.

        res.redirect(urlRecord.long_url);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get All URLs for a User
exports.getUserURLs = async (req, res) => {
    const user_id = req.user.user_id;

    try {
        const urls = await URL.findByUserId(user_id);
        res.json(urls);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a URL (Admin or Owner)
exports.deleteURL = async (req, res) => {
    const { short_code } = req.params;
    const user = req.user;

    try {
        const urlRecord = await URL.findByShortCode(short_code);
        if (!urlRecord) {
            return res.status(404).json({ msg: 'URL not found' });
        }

        // Check if the user is admin or the owner of the URL
        if (user.is_admin || urlRecord.user_id === user.user_id) {
            await URL.deleteByShortCode(short_code);
            return res.json({ msg: 'URL deleted successfully' });
        } else {
            return res.status(403).json({ msg: 'Unauthorized' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
