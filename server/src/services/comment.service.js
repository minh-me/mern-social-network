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
    totalDocs: 'totalComments',
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
  const comment = await Comment.findByIdAndUpdate(commentId, body)
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

export {
  createComment,
  queryComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
}
