const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "jwtSecret";
const expiresIn = process.env.TOKEN_EXPIRES_IN_SECONDS || 3600;
module.exports.signJWT = payload => {
  payload.expiresIn = expiresIn;
  return jwt.sign(payload, jwtSecret);
};
