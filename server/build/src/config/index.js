const _typeof = require('@babel/runtime/helpers/typeof')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
const _exportNames = {
  db: true,
}
exports.db = void 0

const _config = require('./config')

Object.keys(_config).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _config[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _config[key]
    },
  })
})

const _db = _interopRequireWildcard(require('./db'))

exports.db = _db

const _logger = require('./logger')

Object.keys(_logger).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _logger[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logger[key]
    },
  })
})

const _passport = require('./passport')

Object.keys(_passport).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _passport[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _passport[key]
    },
  })
})

const _rateLimit = require('./rateLimit')

Object.keys(_rateLimit).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _rateLimit[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rateLimit[key]
    },
  })
})

const _roles = require('./roles')

Object.keys(_roles).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return
  if (key in exports && exports[key] === _roles[key]) return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _roles[key]
    },
  })
})

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null
  const cacheBabelInterop = new WeakMap()
  const cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj }
  }
  const cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  const newObj = {}
  const hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (const key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      const desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}
