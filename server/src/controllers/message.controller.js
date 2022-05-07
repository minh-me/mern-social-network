import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { messageService } from '../services'
import { tranSuccess } from '../_lang/en'

/**
 * Create a message
 * @POST api/messages/
 * @access private
 */
const createMessage = catchAsync(async (req, res) => {
  const item = req.body

  // Add current user to sender and readBy
  item.sender = req.user.id
  item.readBy = req.user.id

  const message = await messageService.createMessage(item)

  res.status(201).json(message)
})

/**
 * Get all messages
 * @GET api/messages
 * @access public
 */
const getMessages = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])

  const result = await messageService.queryMessages(filter, options)

  res.send(result)
})

/**
 * Get a message by message id
 * @GET api/messages/:messageId
 * @access public
 */
const getMessage = catchAsync(async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId)

  if (!message) throw createError.NotFound()

  res.send(message)
})

/**
 * Update a message by messageId
 * @PATCH api/messages/:messageId
 * @access private
 */
const updateMessage = catchAsync(async (req, res) => {
  const message = await messageService.updateMessageById(
    req.params.messageId,
    req.body
  )

  res.send(message)
})

/**
 * Delete message by messageId
 * @DELETE api/messages/:messageId
 * @access private
 */
const deleteMessage = catchAsync(async (req, res) => {
  const message = await messageService.deleteMessageById(req.params.messageId)
  res.send(message)
})

export { createMessage, getMessages, getMessage, updateMessage, deleteMessage }
