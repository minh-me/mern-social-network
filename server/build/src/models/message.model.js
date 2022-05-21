"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _plugins = require("./plugins");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var messageSchema = _mongoose["default"].Schema({
  sender: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  readBy: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  chat: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  text: {
    type: String
  },
  image: {
    id: {
      type: String,
      select: false
    },
    url: String
  }
}, {
  timestamps: true
}); // add plugin that converts mongoose to json


messageSchema.plugin(_plugins.toJSON);
messageSchema.plugin(_plugins.paginate);
/**
 * @typedef Message
 */

var Message = _mongoose["default"].model('Message', messageSchema);

exports.Message = Message;