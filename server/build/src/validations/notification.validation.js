"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotifications = exports.updateNotification = exports.getNotifications = exports.getNotification = exports.deleteNotification = exports.createNotification = exports.count = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _en = require("../_lang/en");

var _config = _interopRequireDefault(require("./config.validation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createNotification = {
  userTo: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  userFrom: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  type: yup.string().oneOf(['follow', 'like']).required(),
  entityId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.createNotification = createNotification;
var getNotifications = {
  opened: yup["boolean"](),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string()
};
exports.getNotifications = getNotifications;
var count = {
  opened: yup["boolean"]()
};
exports.count = count;
var getNotification = {
  notificationId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.getNotification = getNotification;
var updateNotification = {
  notificationId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  opened: yup["boolean"]()
};
exports.updateNotification = updateNotification;
var updateNotifications = {
  opened: yup["boolean"]()
};
exports.updateNotifications = updateNotifications;
var deleteNotification = {
  notificationId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.deleteNotification = deleteNotification;