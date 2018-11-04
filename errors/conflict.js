const BaseError = require("./base-error");
class ConflictError extends BaseError {
  constructor(message, data) {
    super(message, 409, data);
  }
}
module.exports = ConflictError;
