const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.updateChat =
  exports.getChats =
  exports.getChat =
  exports.deleteChat =
  exports.createChat =
    void 0

const _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
)

const _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
)

const _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)

const _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

const _httpErrors = _interopRequireDefault(require('http-errors'))

const _pick = _interopRequireDefault(require('../utils/pick'))

const _catchAsync = _interopRequireDefault(require('../utils/catchAsync'))

const _services = require('../services')

function ownKeys(object, enumerableOnly) {
  const keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(object)
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })),
      keys.push.apply(keys, symbols)
  }
  return keys
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          ;(0, _defineProperty2.default)(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          )
        })
  }
  return target
}

/**
 * Create a chat
 * @POST api/chats/
 * @access private
 */
const createChat = (0, _catchAsync.default)(
  /* #__PURE__ */ (function () {
    const _ref = (0, _asyncToGenerator2.default)(
      /* #__PURE__ */ _regenerator.default.mark(function _callee(req, res) {
        let chat
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return _services.chatService.createChat(
                  _objectSpread(
                    _objectSpread({}, req.body),
                    {},
                    {
                      users: [].concat(
                        (0, _toConsumableArray2.default)(req.body.users),
                        [req.user.id]
                      ),
                    }
                  )
                )

              case 2:
                chat = _context.sent
                res.status(201).json(chat)

              case 4:
              case 'end':
                return _context.stop()
            }
          }
        }, _callee)
      })
    )

    return function (_x, _x2) {
      return _ref.apply(this, arguments)
    }
  })()
)
/**
 * Get all chats
 * @GET api/chats
 * @access public
 */

exports.createChat = createChat
const getChats = (0, _catchAsync.default)(
  /* #__PURE__ */ (function () {
    const _ref2 = (0, _asyncToGenerator2.default)(
      /* #__PURE__ */ _regenerator.default.mark(function _callee2(req, res) {
        let filter
        let options
        let result
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                filter = (0, _pick.default)(req.query, [])
                options = (0, _pick.default)(req.query, [
                  'sort',
                  'select',
                  'limit',
                  'page',
                ])
                _context2.next = 4
                return _services.chatService.queryChats(filter, options)

              case 4:
                result = _context2.sent
                res.send(result)

              case 6:
              case 'end':
                return _context2.stop()
            }
          }
        }, _callee2)
      })
    )

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments)
    }
  })()
)
/**
 * Get a chat by chat id
 * @GET api/chats/:chatId
 * @access public
 */

exports.getChats = getChats
const getChat = (0, _catchAsync.default)(
  /* #__PURE__ */ (function () {
    const _ref3 = (0, _asyncToGenerator2.default)(
      /* #__PURE__ */ _regenerator.default.mark(function _callee3(req, res) {
        let chat
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2
                return _services.chatService.getChatById(req.params.chatId)

              case 2:
                chat = _context3.sent

                if (chat) {
                  _context3.next = 5
                  break
                }

                throw _httpErrors.default.NotFound()

              case 5:
                res.send(chat)

              case 6:
              case 'end':
                return _context3.stop()
            }
          }
        }, _callee3)
      })
    )

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments)
    }
  })()
)
/**
 * Update a chat by chatId
 * @PATCH api/chats/:chatId
 * @access private
 */

exports.getChat = getChat
const updateChat = (0, _catchAsync.default)(
  /* #__PURE__ */ (function () {
    const _ref4 = (0, _asyncToGenerator2.default)(
      /* #__PURE__ */ _regenerator.default.mark(function _callee4(req, res) {
        let chat
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.next = 2
                return _services.chatService.updateChatById(
                  req.params.chatId,
                  req.body
                )

              case 2:
                chat = _context4.sent
                res.send(chat)

              case 4:
              case 'end':
                return _context4.stop()
            }
          }
        }, _callee4)
      })
    )

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments)
    }
  })()
)
/**
 * Delete chat by chatId
 * @DELETE api/chats/:chatId
 * @access private
 */

exports.updateChat = updateChat
const deleteChat = (0, _catchAsync.default)(
  /* #__PURE__ */ (function () {
    const _ref5 = (0, _asyncToGenerator2.default)(
      /* #__PURE__ */ _regenerator.default.mark(function _callee5(req, res) {
        let chat
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.next = 2
                return _services.chatService.deleteChatById(req.params.chatId)

              case 2:
                chat = _context5.sent
                res.send(chat)

              case 4:
              case 'end':
                return _context5.stop()
            }
          }
        }, _callee5)
      })
    )

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments)
    }
  })()
)
exports.deleteChat = deleteChat
