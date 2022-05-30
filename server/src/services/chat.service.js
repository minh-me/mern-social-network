import createHttpError from 'http-errors'
import { Chat } from '../models'

/**
 * Create new chat
 * @param {Object} body
 * @returns {Promise<Chat>}
 */
const createChat = async chatBody => {
  const newChat = await Chat.create(chatBody)
  return newChat
}

/**
 * Get chats by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Chat[]>}
 */
const queryChats = async (filter, options) => {
  const customLabels = {
    docs: 'chats',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
  }

  options = { ...options, customLabels }

  const chats = await Chat.paginate(filter, options)

  return chats
}

/**
 * Get chat by id
 * @param {ObjectId} chatId
 * @returns {Promise<Chat>}
 */
const getChatById = async chatId => {
  const chat = await Chat.findById(chatId).populate('users')
  return chat
}

/**
 * Find chat
 * @param {Object} filter
 * @returns {Promise<Chat>}
 */
const findOne = async filter => {
  const chat = await Chat.findOne(filter)
  return chat
}

/**
 * Update chat
 * @param {FilterQuery} filter
 * @param {Object} filter
 * @returns {Promise<Chat>}
 */
const updateOne = async (filter, body) => {
  const chat = await Chat.findOneAndUpdate(filter, body, {
    upsert: true,
    new: true,
  }).populate('users')

  return chat
}

/**
 * Update chat by id
 * @param {ObjectId} chatId
 * @param {Object} body
 * @returns {Promise<Chat>}
 */
const updateChatById = async (chatId, body) => {
  const chat = await Chat.findByIdAndUpdate(chatId, body, {
    new: true,
  })
    .populate(['admin', 'users', 'latestMessage'])
    .deepPopulate('latestMessage.sender')

  if (!chat) throw new createHttpError.NotFound('Not found chat.')

  return chat
}

/**
 * Delete chat by id
 * @param {ObjectId} chatId
 * @returns {Promise<Chat>}
 */
const deleteChatById = async chatId => {
  const chat = await Chat.findByIdAndDelete(chatId)

  if (!chat) throw new createHttpError.NotFound('Not found chat.')

  return chat
}

export {
  createChat,
  queryChats,
  getChatById,
  findOne,
  updateChatById,
  updateOne,
  deleteChatById,
}
