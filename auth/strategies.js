const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { User } = require("../models");
const jwtSecret = process.env.JWT_SECRET || "jwtSecret";

module.exports.localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  (email, password, cb) => {
    return User.findOne({ email })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: "Incorrect email or password." });
        }
        user.comparePassword(password, function(err, match) {
          if (err) throw err;

          if (match) return cb(null, user);

          return cb(false);
        });
      })
      .catch(err => cb(err));
  }
);

module.exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  },
  function(jwtPayload, cb) {
    return cb(null, jwtPayload);
  }
);
