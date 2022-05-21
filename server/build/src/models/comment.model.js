"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Comment = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _plugins = require("./plugins");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var commentSchema = _mongoose["default"].Schema({
  text: {
    type: String,
    trim: true
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: true
  },
  image: {
    id: {
      type: String,
      select: false
    },
    url: String
  },
  replyTo: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  parentId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  likes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
}); // add plugin that converts mongoose to json


commentSchema.plugin(_plugins.toJSON);
commentSchema.plugin(_plugins.paginate);
/**
 * @typedef Comment
 */

var Comment = _mongoose["default"].model('Comment', commentSchema);

exports.Comment = Comment;