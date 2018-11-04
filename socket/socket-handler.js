const jwt = require("jsonwebtoken");
const logger = require("../logger");

let io;
const connectedUsers = {};

module.exports.events = {
  MOVIE_UPDATED: "MOVIE_UPDATED"
};

module.exports.initIo = _io => {
  io = _io;
  io.use(authenticate);
};

module.exports.onConnection = client => {
  logger.debug(`socket-handler: new connection ${client.id}`);

  socket.on("disconnect", function(reason) {
    const user = connectedUsers[client.id];
    const userInfo = user ? `${user._id}/${user.email}` : "N/A";
    logger.info(
      `socket-handler: socket ${
        socket.id
      } disconnected for "${reason}" with user ${userInfo}`
    );

    if (user) {
      delete connectedUsers[socket.id];
    }
  });
};

const authenticate = (socket, next) => {
  const token = socket.handshake.query.token;
  if (!token) {
    logger.warn(
      `socket-handler: auth failure on socket ${
        socket.id
      }, auth token not found`
    );
    return next(new Error("socket authentication error"));
  }

  jwt.verify(token, process.env.JWT, function(err, user) {
    if (err) {
      logger.warn(
        `socket-handler: auth failure on socket ${
          socket.id
        }, failed to verify auth token. ${err.stack || err}`
      );
      return next(err);
    }

    logger.info(
      `socket-handler: user ${user._id}/${user.email} connected by socket ${
        socket.id
      }`
    );
    connectedUsers[socket.id] = user;
    return next();
  });
};
module.exports.notifyMovieUpdated = movie => {
  if (io) {
    io.sockets.emit(events.MOVIE_UPDATED, movie);
  } else {
    logger.error(`socket-handler: socket not initialized`);
  }
};
