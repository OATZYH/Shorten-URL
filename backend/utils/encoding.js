const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const crypto = require('crypto');

function base62Encode(buffer) {
  let result = '';
  let num = BigInt('0x' + buffer.toString('hex'));
  const base = BigInt(BASE62.length);
  while (num > 0) {
    const mod = num % base;
    result = BASE62[mod] + result;
    num = num / base;
  }
  return result;
}

function generateShortCode(url, length = 8) {
  // Create a hash of the URL
  const hash = crypto.createHash('sha256').update(url).digest();

  // Encode the hash into a base62 string
  const fullCode = base62Encode(hash);

  // Use the first 'length' characters as the short code
  const shortCode = fullCode.substring(0, length);

  return shortCode;
}

module.exports = { generateShortCode  };
