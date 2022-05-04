import createHttpError from 'http-errors'
import { Post } from '../models'
import * as uploadService from './upload.service'

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
 * @param {PostBody} body
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, body) => {
  const post = await Post.findByIdAndUpdate(postId, body, { new: true })
  if (!post) throw new createHttpError.NotFound('Not found post.')
  return post
}

/**
 * Delte post by id
 * @param {ObjectId} postId
 * @returns {Promise<post>}
 */
const deletePostById = async postId => {
  const post = await Post.findByIdAndDelete(postId).select('+image.id')
  if (post?.image?.id) {
    uploadService.destroy(post.image.id)
  }
  if (!post) throw new createHttpError.NotFound('Not found post.')
  return post
}
/**
 * Delte many posts
 * @param {Object} filter
 * @returns {Promise<acknowledged: boolean, deletedCount: number>}
 */
const deletePosts = async filter => {
  const posts = await Post.find(filter).select('+image.id')
  posts.forEach(post => {
    if (post?.image?.id) {
      uploadService.destroy(post.image.id)
    }
  })

  const result = await Post.deleteMany(filter)

  return result
}

export {
  createPost,
  queryPosts,
  getPostById,
  updatePostById,
  deletePostById,
  deletePosts,
}
