import createHttpError from 'http-errors'
import { Comment } from '../models'
import * as uploadService from './upload.service'

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
  if (comment) return comment
  throw createHttpError.NotFound('Not found comment.')
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
 * Delete comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<comment>}
 */
const deleteCommentById = async commentId => {
  const comment = await Comment.findByIdAndDelete(commentId)
  if (comment?.image?.id) {
    uploadService.destroy(comment.image.id)
  }
  if (!comment) throw new createHttpError.NotFound('Not found comment.')
  return comment
}

/**
 * Delete comment by id
 * @param {Object} filter
 * @returns {Promise<result>}
 */
const deleteMany = async filter => {
  const comments = await Comment.find(filter)

  comments.forEach(comment => {
    if (comment?.image?.id) {
      uploadService.destroy(comment.image.id)
    }
  })

  const result = await Comment.deleteMany(filter)

  return result
}

export {
  createComment,
  queryComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  deleteMany,
}
