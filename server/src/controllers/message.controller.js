import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { chatService, messageService, uploadService } from '../services'

/**
 * Create a message
 * @POST api/messages/
 * @access private
 */
const createMessage = catchAsync(async (req, res) => {
  // If create message renameChat => parse isRename to bool
  if (req.body.isRename) req.body.isRename = JSON.parse(req.body.isRename)

  // Create item
  const item = {
    ...req.body,
    sender: req.user.id,
    readBy: [req.user.id],
  }

  // Check upload file
  if (req.file) {
    const result = await uploadService.uploadImageMessage(req.file.path)
    item.image = result
  }

  // Create message
  const message = await messageService.createMessage(item)

  // Success
  res.status(201).json(message)
})

/**
 * Get all messages
 * @GET api/messages
 * @access private
 */
const getMessages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['chat'])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])

  options.populate = 'sender,readBy,chat'

  const result = await messageService.queryMessages(filter, options)

  res.send(result)
})

/**
 * Get a message by message id
 * @GET api/messages/:messageId
 * @access private
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
 * Update a message by messageId
 * @PATCH api/messages/:messageId/readBy
 * @access private
 */
const addToReadBy = catchAsync(async (req, res) => {
  const message = await messageService.addToReadBy(
    req.params.chatId,
    req.user.id
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

export {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  addToReadBy,
  deleteMessage,
}
