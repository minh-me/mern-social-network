"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChat = exports.getChats = exports.getChatByUserId = exports.getChat = exports.deleteChat = exports.createChat = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _en = require("../_lang/en");

var _config = _interopRequireDefault(require("./config.validation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createChat = {
  chatName: yup.string(),
  isGroupChat: yup["boolean"]().required()["default"](false),
  users: yup.array().of(yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required())
};
exports.createChat = createChat;
var getChats = {
  chatName: yup.string(),
  isGroupChat: yup.string(),
  lastestMessage: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string()
};
exports.getChats = getChats;
var getChat = {
  chatId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.getChat = getChat;
var getChatByUserId = {
  userId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.getChatByUserId = getChatByUserId;
var updateChat = {
  chatId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  chatName: yup.string().required()
};
exports.updateChat = updateChat;
var deleteChat = {
  chatId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.deleteChat = deleteChat;