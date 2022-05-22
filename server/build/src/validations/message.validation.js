"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMessage = exports.getMessages = exports.getMessage = exports.deleteMessage = exports.createMessage = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _en = require("../_lang/en");

var _config = _interopRequireDefault(require("./config.validation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createMessage = {
  readBy: yup.array().of(yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect)).nullable(true),
  chat: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  text: yup.string(),
  image: yup.string()
};
exports.createMessage = createMessage;
var getMessages = {
  chat: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect),
  text: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string()
};
exports.getMessages = getMessages;
var getMessage = {
  messageId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.getMessage = getMessage;
var updateMessage = {
  messageId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  text: yup.string().required()
};
exports.updateMessage = updateMessage;
var deleteMessage = {
  messageId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.deleteMessage = deleteMessage;