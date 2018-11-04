const socketHandler = require("./socket-handler");

module.exports.initiSocket = server => {
  const io = require("socket.io").listen(server);

  io.on("connection", socketHandler.onConnection);
  socketHandler.initIo(io);
};
