import { Message } from '../models'
import createHttpError from 'http-errors'

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
    totalDocs: 'totalMessages',
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
 * Create message
 * @param {Object} body
 * @returns {Promise<message>}
 */
const createMessage = async messageBody => {
  const newMessage = await Message.create(messageBody)
  return newMessage
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
 * Delte message by id
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
  updateMessageById,
  deleteMessageById,
}
