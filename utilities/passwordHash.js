const crypto = require("crypto");
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

const saltHashPassword = (password) => {
    let passwordData = sha512(password, 'secret');
    return passwordData.passwordHash;
  }

module.exports = {
     saltHashPassword
    }
