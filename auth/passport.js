const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./strategies");

module.exports.config = () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};
