const express = require("express");
const router = express.Router();
const passport = require("passport");
const validate = require("express-validation");

const jwtHelper = require("../../auth/jwt-helper");
const userService = require("../../services/user-service");
const uiErrors = require("../../ui-errors");
const validation = require("../validation/user");
const logger = require("../../logger");

router.post("/login", validate(validation.login), function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) return next(err);
    logger.error(
      `auth: login attempt with invalid credentials, email:${req.body.email}`
    );
    if (!user) return res.status(401).send(uiErrors.INVALID_LOGIN_CREDENTIALS);

    logger.info(`auth: valid login credential, email:${req.body.email}`);
    const token = jwtHelper.signJWT({ _id: user._id, email: user.email });
    res.status(200).send({ token });
  })(req, res, next);
});

router.post("/signup", function(req, res, next) {
  const { email, password } = req.body;
  userService
    .signUp(email, password)
    .then(user => {
      res.status(201).send(user);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});
module.exports = router;
