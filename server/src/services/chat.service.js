import { Chat } from '../models'

/**
 * Get chats by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<chats>}
 */
const queryChats = async (filter, options) => {
  const customLabels = {
    docs: 'chats',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalChats',
  }
  options = { ...options, customLabels }
  const chats = await Chat.paginate(filter, options)
  return chats
}

/**
 * Find chat by id
 * @param {ObjectId} chatId
 * @returns {Promise<chat>}
 */
const getChatById = async chatId => {
  const chat = await Chat.findById(chatId)
  return chat
}

/**
 * Create chat
 * @param {Object} body
 * @returns {Promise<chat>}
 */
const createChat = async chatBody => {
  const newChat = await Chat.create(chatBody)
  return newChat
}
/**
 * Update chat by id
 * @param {ObjectId} chatId
 * @param {Object} body
 * @returns {Promise<chat>}
 */
const updateChatById = async (chatId, body) => {
  const chat = await Chat.findByIdAndUpdate(chatId, body)
  return chat
}

/**
 * Delte chat by id
 * @param {ObjectId} chatId
 * @returns {Promise<chat>}
 */
const deleteChatById = async chatId => {
  const result = await Chat.findByIdAndDelete(chatId)
  return result
}

export { createChat, queryChats, getChatById, updateChatById, deleteChatById }
