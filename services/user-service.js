/**
 * user service module
 * @module services/user-service
 */

const { User } = require("../models");
const ConflictError = require("../errors/conflict");
const uiErrors = require("../ui-errors");
const logger = require("../logger");

/**
 * creates a new user, throws error for duplicate email
 *
 * @param email
 * @param password
 */
module.exports.signUp = (email, password) => {
  return User.find({ email }).then(users => {
    if (users.length) {
      logger.error(`an user with email: ${email} already exists`);
      throw new ConflictError(`email already exists`, uiErrors.REG_DUP_EMAIL);
    }
    logger.debug(`creating user with email: ${email}`);
    const user = new User({
      email,
      password
    });
    return user.save(user);
  });
};
