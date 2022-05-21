"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCors = void 0;

var _cors = _interopRequireDefault(require("cors"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin || whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(_httpErrors["default"].Forbidden("The CORS policy for this origin doesn't allow access from the particular origin."));
    }
  },
  credentials: true
};
var configCors = (0, _cors["default"])(corsOptions);
exports.configCors = configCors;