const Joi = require("joi");

module.exports.login = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
};

module.exports.signup = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  }
};
