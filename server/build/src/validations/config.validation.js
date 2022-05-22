"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var config = {
  regexObjectId: /^[0-9a-fA-F]{24}$/,
  regexPassword: /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
  avatarSize: 1024 * 1024,
  // 1M
  avatarTypes: ['image/jpg', 'image/jpeg', 'image/png']
};
var _default = config;
exports["default"] = _default;