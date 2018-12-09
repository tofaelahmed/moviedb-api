const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "jwtSecret";
const expiresIn = process.env.TOKEN_EXPIRES_IN || "10h";
module.exports.signJWT = payload => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};
