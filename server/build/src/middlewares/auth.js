"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var passport = require('passport');

var createHttpError = require('http-errors');

var auth = function auth() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    passport.authenticate('jwt', {
      session: false
    }, function (err, user, info) {
      if (err || info || !user) {
        var message = (info === null || info === void 0 ? void 0 : info.name) == 'TokenExpiredError' ? 'Token has expired, please try again.' : 'Please authenticate.';
        return next(new createHttpError.Unauthorized(message));
      }

      req.user = user;

      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return next(createHttpError.Forbidden("User role ".concat(req.user.role, " is not authorized to access this route")));
      }

      next();
    })(req, res, next);
  };
};

exports.auth = auth;