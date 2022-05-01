import { Comment } from '../models'
import createHttpError from 'http-errors'

/**
 * Get comments by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<comments>}
 */
const queryComments = async (filter, options) => {
  const customLabels = {
    docs: 'comments',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
  }
  options = { ...options, customLabels }
  const comments = await Comment.paginate(filter, options)
  return comments
}

/**
 * Find comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<comment>}
 */
const getCommentById = async commentId => {
  const comment = await Comment.findById(commentId)
  return comment
}

/**
 * Create comment
 * @param {Object} body
 * @returns {Promise<comment>}
 */
const createComment = async commentBody => {
  const newComment = await Comment.create(commentBody)
  return newComment
}
/**
 * Update comment by id
 * @param {ObjectId} commentId
 * @param {Object} body
 * @returns {Promise<comment>}
 */
const updateCommentById = async (commentId, body) => {
  const comment = await Comment.findByIdAndUpdate(commentId, body, {
    new: true,
  })
  if (!comment) throw new createHttpError.NotFound('Not found comment.')
  return comment
}

/**
 * Delte comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<comment>}
 */
const deleteCommentById = async commentId => {
  const comment = await Comment.findByIdAndDelete(commentId)
  if (!comment) throw new createHttpError.NotFound('Not found comment.')
  return comment
}

/**
 * Delte comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<comment>}
 */
const getReplies = async commentId => {
  const comments = await Comment.find({ reply: commentId })
  return comments
}
/**
 * Delte comment by id
 * @param {ObjectId} commentId
 * @param {Object} body
 * @returns {Promise<comment>}
 */
const replyComment = async (commentId, body) => {
  const comment = await Comment.findById(commentId)
  if (!comment) throw new createHttpError.NotFound('Not found comment.')

  const newComment = await Comment.create({
    ...body,
    post: comment.post,
    reply: comment.id,
  })

  return newComment
}

export {
  createComment,
  queryComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  replyComment,
  getReplies,
}
