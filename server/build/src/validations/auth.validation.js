"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.login = exports.google = exports.forgotPassword = exports.activate = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _en = require("../_lang/en");

var _config = _interopRequireDefault(require("./config.validation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var activate = {
  activation_token: yup.string().required()
};
exports.activate = activate;
var login = {
  email: yup.string().required(),
  password: yup.string().matches(_config["default"].regexPassword, _en.transValidations.password_incorrect).required()
};
exports.login = login;
var google = {
  email: yup.string().required(),
  googleId: yup.string().required(),
  imageUrl: yup.string(),
  name: yup.string().required()
};
exports.google = google;
var forgotPassword = {
  email: yup.string().email().required()
};
exports.forgotPassword = forgotPassword;
var resetPassword = {
  password: yup.string().matches(_config["default"].regexPassword, _en.transValidations.password_incorrect).required()
};
exports.resetPassword = resetPassword;