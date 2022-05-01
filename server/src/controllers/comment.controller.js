import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { commentService } from '../services'

/**
 * Create a comment
 * @POST api/comments/
 * @access private
 */
const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment({
    ...req.body,
    user: req.user.id,
  })
  res.status(201).json(comment)
})

/**
 * Get all comments
 * @GET api/comments
 * @access public
 */
const getComments = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])
  const result = await commentService.queryComments(filter, options)
  res.send(result)
})

/**
 * Reply comment
 * @Post api/comments/:commentId/reply
 * @access private
 */
const getReplies = catchAsync(async (req, res) => {
  const filter = { reply: req.params.commentId }
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])
  options.populate = 'user'
  const replies = await commentService.queryComments(filter, options)
  res.send(replies)
})

/**
 * Reply comment
 * @Post api/comments/:postId/reply
 * @access private
 */
const getCommentsByPost = catchAsync(async (req, res) => {
  const filter = { post: req.params.postId, reply: { $eq: null } }
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])
  options.populate = 'user'
  const comments = await commentService.queryComments(filter, options)
  res.send(comments)
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
  const comment = await commentService.deleteCommentById(req.params.commentId)
  res.send(comment)
})

/**
 * Reply comment
 * @Post api/comments/:commentId/reply
 * @access private
 */
const replyComment = catchAsync(async (req, res) => {
  const comment = await commentService.replyComment(req.params.commentId, {
    ...req.body,
    user: req.user.id,
  })
  res.send(comment)
})

export {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  replyComment,
  getReplies,
  getCommentsByPost,
}
