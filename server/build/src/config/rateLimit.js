"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limiter = exports.authLimiter = void 0;

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

// limter
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 10 * 60 * 1000,
  // 10 mins
  max: 100
}); // auth rate limit

exports.limiter = limiter;
var authLimiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true
});
exports.authLimiter = authLimiter;