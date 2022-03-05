import { Comment } from '../models'

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
  return comment
}

/**
 * Delte comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<comment>}
 */
const deleteCommentById = async commentId => {
  const result = await Comment.findByIdAndDelete(commentId)
  return result
}

export default {
  createComment,
  queryComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
}
