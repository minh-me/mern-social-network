import { Post } from '../models'

/**
 * Get posts by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<posts>}
 */
const queryPosts = async (filter, options) => {
  const customLabels = {
    docs: 'posts',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalPosts',
  }
  options = { ...options, customLabels }
  const posts = await Post.paginate(filter, options)
  return posts
}

/**
 * Find post by id
 * @param {ObjectId} postId
 * @returns {Promise<post>}
 */
const getPostById = async postId => {
  const post = await Post.findById(postId)
  return post
}

/**
 * Create post
 * @param {Object} body
 * @returns {Promise<post>}
 */
const createPost = async postBody => {
  const newPost = await Post.create(postBody)
  return newPost
}
/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} body
 * @returns {Promise<post>}
 */
const updatePostById = async (postId, body) => {
  const post = await Post.findByIdAndUpdate(postId, body)
  return post
}

/**
 * Delte post by id
 * @param {ObjectId} postId
 * @returns {Promise<post>}
 */
const deletePostById = async postId => {
  const result = await Post.findByIdAndDelete(postId)
  return result
}

export default {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
}
