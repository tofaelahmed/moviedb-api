const BaseError = require("./base-error");
class NotFoundError extends BaseError {
  constructor(message, data) {
    super(message, 404, data);
  }
}
module.exports = NotFoundError;
