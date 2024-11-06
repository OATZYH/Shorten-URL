const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const crypto = require('crypto');

function generateRandomString(length = 10) {
  let randomString = '';
  
  for (let i = 0; i < length; i++) {
    // Generate a random index based on the length of BASE62
    const randomIndex = crypto.randomInt(0, BASE62.length);
    randomString += BASE62[randomIndex];
  }

  return randomString;
}

module.exports = { generateRandomString };
