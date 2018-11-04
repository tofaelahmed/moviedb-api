const expressValidation = require("express-validation");
const logger = require("../logger");

const errorHandler = (err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  console.log(err);
  if (err instanceof expressValidation.ValidationError)
    return res.status(err.status).json(err);

  if (process.env.NODE_ENV !== "production") {
    return res.status(500).send(err.stack);
  } else {
    return res.status(500);
  }
};

module.exports = errorHandler;
