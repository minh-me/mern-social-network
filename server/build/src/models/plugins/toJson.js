"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toJSON = toJSON;

function toJSON(schema) {
  var _transform;

  if (schema.options.toJSON && schema.options.toJSON.transform) {
    _transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform: function transform(doc, ret, options) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;

      if (_transform) {
        return _transform(doc, ret, options);
      }

      return ret;
    }
  });
}