import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { chatService } from '../services'

/**
 * Create a chat
 * @POST api/chats/
 * @access private
 */
const createChat = catchAsync(async (req, res) => {
  const chat = await chatService.createChat({
    ...req.body,
    users: [...req.body.users, req.user.id],
  })
  res.status(201).json(chat)
})

/**
 * Get all chats
 * @GET api/chats
 * @access public
 */
const getChats = catchAsync(async (req, res) => {
  const filter = { users: req.user.id }
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])

  options.populate = 'users'

  const result = await chatService.queryChats(filter, options)
  res.send(result)
})

/**
 * Get a chat by chat id
 * @GET api/chats/:chatId
 * @access public
 */
const getChat = catchAsync(async (req, res) => {
  const chat = await chatService.getChatById(req.params.chatId)
  if (!chat) {
    throw createError.NotFound()
  }
  res.send(chat)
})

/**
 * Update a chat by chatId
 * @PATCH api/chats/:chatId
 * @access private
 */
const updateChat = catchAsync(async (req, res) => {
  const chat = await chatService.updateChatById(req.params.chatId, req.body)
  res.send(chat)
})

/**
 * Delete chat by chatId
 * @DELETE api/chats/:chatId
 * @access private
 */
const deleteChat = catchAsync(async (req, res) => {
  const chat = await chatService.deleteChatById(req.params.chatId)
  res.send(chat)
})

export { createChat, getChats, getChat, updateChat, deleteChat }
