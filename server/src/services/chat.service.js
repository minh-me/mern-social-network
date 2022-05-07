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
  const chat = await Chat.findById(chatId)
  return chat
}

/**
 * Update chat by id
 * @param {ObjectId} chatId
 * @param {Object} body
 * @returns {Promise<Chat>}
 */
const updateChatById = async (chatId, body) => {
  const chat = await Chat.findByIdAndUpdate(chatId, body, { new: true })
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

export { createChat, queryChats, getChatById, updateChatById, deleteChatById }
