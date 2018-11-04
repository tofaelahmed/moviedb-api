const BaseError = require("./base-error");
class UnauthorizedError extends BaseError {
  constructor(message, data) {
    super(message, 401, data);
  }
}
module.exports = UnauthorizedError;
