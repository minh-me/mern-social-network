import createHttpError from 'http-errors'
import { chatService } from '.'
import { Message } from '../models'

/**
 * Create message
 * @param {Object} body
 * @returns {Promise<message>}
 */
const createMessage = async messageBody => {
  const newMessage = await Message.create(messageBody)

  console.log({ mesID: newMessage._id })
  // Update latestMessage in chat
  await chatService.updateChatById(newMessage.chat, {
    latestMessage: newMessage._id,
  })

  return newMessage.populate(['chat', 'sender', 'readBy'])
}

/**
 * Get messages by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<messages>}
 */
const queryMessages = async (filter, options) => {
  const customLabels = {
    docs: 'messages',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
  }
  options = { ...options, customLabels }
  const messages = await Message.paginate(filter, options)
  return messages
}

/**
 * Find message by id
 * @param {ObjectId} messageId
 * @returns {Promise<message>}
 */
const getMessageById = async messageId => {
  const message = await Message.findById(messageId)
  return message
}

/**
 * Find message by filter
 * @param {Object} filter
 * @returns {Promise<message>}
 */
const findOne = async filter => {
  const message = await Message.findOne(filter)
  return message
}

/**
 * Count notification by filter
 * @param {Object} filter
 * @returns {Promise<Number>}
 */
const count = async filter => {
  const result = await Message.count(filter)

  return result
}

/**
 * Update message by id
 * @param {ObjectId} messageId
 * @param {Object} body
 * @returns {Promise<message>}
 */
const updateMessageById = async (messageId, body) => {
  const message = await Message.findByIdAndUpdate(messageId, body, {
    new: true,
  })
  if (!message) throw new createHttpError.NotFound('Not found message.')
  return message
}

/**
 * Update message by id
 * @param {ObjectId} chatId
 * @param {ObjectId} userId
 * @returns {Promise<message>}
 */
const addToReadBy = async (chatId, userId) => {
  const message = await Message.findOneAndUpdate(
    { chat: chatId },
    { $addToSet: { readBy: userId } },
    { new: true }
  ).sort('-createdAt')

  return message
}

/**
 * Delete message by id
 * @param {ObjectId} messageId
 * @returns {Promise<message>}
 */
const deleteMessageById = async messageId => {
  const message = await Message.findByIdAndDelete(messageId)
  if (!message) throw new createHttpError.NotFound('Not found message.')
  return message
}

export {
  createMessage,
  queryMessages,
  getMessageById,
  findOne,
  count,
  updateMessageById,
  addToReadBy,
  deleteMessageById,
}
