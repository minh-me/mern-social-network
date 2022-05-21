"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _plugins = require("./plugins");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var notificationSchema = new _mongoose.Schema({
  userTo: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userFrom: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: String,
  opened: {
    type: Boolean,
    "default": false
  },
  entityId: {
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

notificationSchema.plugin(_plugins.toJSON);
notificationSchema.plugin(_plugins.paginate);
/**
 * @typedef Notification
 */

var Notification = _mongoose["default"].model('Notification', notificationSchema);

exports.Notification = Notification;