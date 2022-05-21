"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _winston = require("winston");

var _config = require("./config.js");

var combine = _winston.format.combine,
    colorize = _winston.format.colorize,
    uncolorize = _winston.format.uncolorize,
    label = _winston.format.label,
    splat = _winston.format.splat,
    printf = _winston.format.printf; // enumerate error

var enumerateErrorFormat = (0, _winston.format)(function (info) {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.stack
    });
  }

  return info;
});
var logConfiguration = {
  level: _config.config.env === 'development' ? 'debug' : 'info',
  transports: [new _winston.transports.Console()],
  format: combine(enumerateErrorFormat(), _config.config.env === 'development' ? colorize({
    all: true
  }) : uncolorize(), label({
    label: __filename.split('/').pop()
  }), splat(), printf(function (info) {
    return "".concat("".concat(info.level).bold, ": ").concat(info.message);
  }))
};
var logger = (0, _winston.createLogger)(logConfiguration);
exports.logger = logger;