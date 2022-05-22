"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

require("colors");

var _socket = require("socket.io");

var _cors = require("./config/cors");

var _models = require("./models");

// Run app
var server = _app["default"].listen(_config.config.port, _config.logger.info("Server running in ".concat(_config.config.env, " mode on port ").concat(_config.config.port).cyan.underline));

var EVENTS = {
  setup: 'set_up',
  connected: 'connected',
  joinChat: 'join_chat',
  newMessage: 'new_message',
  messageReceived: 'message_received'
}; // Socket

var io = new _socket.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
});
io.on('connection', function (socket) {
  // logger.info('Connected to socket io.')
  // Setup
  socket.on(EVENTS.setup, function (user) {
    socket.join(user.id);

    _config.logger.info("user ".concat(user.id));

    socket.emit(EVENTS.connected);
  }); // Join chat

  socket.on(EVENTS.joinChat, function (chat) {
    socket.join(chat);
  }); // New message

  socket.on(EVENTS.newMessage, function (message) {
    var chat = message.chat;
    console.log({
      message: message
    });
    if (!chat.users) return _config.logger.error('chat.users not defined.');
    chat.users.forEach(function (user) {
      if (user === message.sender.id) return;
      console.log({
        user: user,
        sender: message.sender.id
      });
      socket.to(user).emit(EVENTS.messageReceived, message);
    });
    console.log('User joined chat: ' + chat.id);
  });
}); // Handle unhandled promise rejections

var exitHandler = function exitHandler() {
  if (server) {
    server.close(function () {
      _config.logger.info('Server closed');

      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

var unexpectedErrorHandler = function unexpectedErrorHandler(error) {
  _config.logger.error(error);

  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', function () {
  _config.logger.info('SIGTERM received');

  if (server) {
    server.close();
  }
});