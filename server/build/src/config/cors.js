"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCors = void 0;

var _cors = _interopRequireDefault(require("cors"));

var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
var configCors = (0, _cors["default"])(corsOptions);
exports.configCors = configCors;