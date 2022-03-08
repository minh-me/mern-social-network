import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { commentService } from '../services'
import { tranSuccess } from '../_lang/en'

/**
 * Create a comment
 * @POST api/comments/
 * @access private
 */
const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body)
  res.status(201).json(comment)
})

/**
 * Get all comments
 * @GET api/comments
 * @access public
 */
const getComments = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await commentService.queryComments(filter, options)
  res.send(result)
})

/**
 * Get a comment by comment id
 * @GET api/comments/:commentId
 * @access public
 */
const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId)
  if (!comment) {
    throw createError.NotFound()
  }
  res.send(comment)
})

/**
 * Update a comment by commentId
 * @PATCH api/comments/:commentId
 * @access private
 */
const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(
    req.params.commentId,
    req.body
  )
  res.send(comment)
})

/**
 * Delete comment by commentId
 * @DELETE api/comments/:commentId
 * @access private
 */
const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId)
  res.send({ message: tranSuccess.deleted_success('comment') })
})

export { createComment, getComments, getComment, updateComment, deleteComment }
