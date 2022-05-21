"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _plugins = require("./plugins");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var chatSchema = _mongoose["default"].Schema({
  chatName: {
    type: String
  },
  isGroupChat: {
    type: Boolean,
    "default": false
  },
  users: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  lastestMessage: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  admin: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json


chatSchema.plugin(_plugins.toJSON);
chatSchema.plugin(_plugins.paginate);
/**
 * @typedef Chat
 */

var Chat = _mongoose["default"].model('Chat', chatSchema);

exports.Chat = Chat;