const URL = require('../models/URL');
const validator = require('validator');

exports.shortenURL = async (req, res) => {
  const { long_url } = req.body;
  const user_id = req.user.user_id;

  if (!long_url) {
    return res.status(400).json({ msg: 'Please provide a long URL' });
  }

  // Validate the URL
  const isValidUrl = validator.isURL(long_url, {
    protocols: ['http', 'https'],
    require_protocol: true,
  });
  if (!isValidUrl) {
    return res.status(400).json({ msg: 'Invalid URL format' });
  }

  try {
    const newUrl = await URL.create(long_url, user_id);

    // Determine the base URL dynamically
    const baseUrl = process.env.BASE_URL || 'http://localhost:5173';

    res.status(201).json({
      short_url: `${baseUrl}/${newUrl.short_code}`,
      long_url: newUrl.long_url,
    });
  } catch (err) {
    console.error('Error in shortenURL:', err.message);
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

    // Increment click count asynchronously
    URL.incrementClickCount(urlRecord.url_id).catch((err) =>
      console.error('Error incrementing click count:', err.message)
    );

    res.json({ long_url: urlRecord.long_url });
  } catch (err) {
    console.error('Error in getLongUrl:', err.message);
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
