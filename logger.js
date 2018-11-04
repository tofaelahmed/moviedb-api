const winston = require("winston");

const options = {
  console: {
    level: "info",
    handleExceptions: true,
    json: false,
    timestamp: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }
};

let logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false
});

module.exports = logger;
