import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { chatService, userService } from '../services'

/**
 * Create a chat
 * @POST api/chats/
 * @access private
 */
const createChat = catchAsync(async (req, res) => {
  // Add user logged in to users
  req.body.users.push(req.user.id)

  // Check chat is exists
  const chatExist = await chatService.findOne({
    users: req.body.users,
  })

  // If chat is exists return chat
  if (chatExist) return res.send(chatExist)

  // Add admin field
  req.body.admin = req.user.id

  // Create chat
  const chat = await chatService.createChat(req.body)

  // Success
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

  options.populate = 'admin,users,latestMessage,latestMessage.sender'

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

  if (!chat) throw createError.NotFound('Not found chat')

  res.send(chat)
})

/**
 * Create a message
 * @Get api/chats/:userId
 * @access private
 */
const getChatByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params

  const user = await userService.getUserById(userId)

  const filter = {
    isGroupChat: false,
    users: { $size: 2, $all: [user.id, req.user.id] },
  }
  const body = {
    chatName: user.name,
    users: [user.id, req.user.id],
  }
  const chat = await chatService.updateOne(filter, body)

  res.status(201).json(chat)
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

export {
  createChat,
  getChats,
  getChat,
  getChatByUserId,
  updateChat,
  deleteChat,
}
