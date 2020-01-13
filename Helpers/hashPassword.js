const crypto = require("crypto");

/**
 * @description This function will be used to hasp password and
 *              during registration and login
 * 
 * @param  password:string salt:string null for registartaion or pass the salt
 *
 * @returns {salt:The salt used to hash the password, hash:The generated hash}
 *
 * @author Ram Pandey
 */
module.exports = (password, salt = null) => {
  if (salt === null) salt = crypto.randomBytes(16).toString("hex");

  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt, hash };
};
