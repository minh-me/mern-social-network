"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var catchAsync = function catchAsync(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next))["catch"](function (err) {
      return next(err);
    });
  };
};

var _default = catchAsync;
exports["default"] = _default;