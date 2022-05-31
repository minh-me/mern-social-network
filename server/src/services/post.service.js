import createHttpError from 'http-errors'
import { Post } from '../models'
import { deleteMany } from './comment.service'
import * as uploadService from './upload.service'

/**
 * Create new post
 * @param {Object} body
 * @returns {Promise<Post>}
 */
const createPost = async postBody => {
  const post = await Post.create(postBody)
  return post.populate('postedBy')
}

/**
 * Get posts by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<{posts: Post[], info: Info}>}
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
 * @returns {Promise<Post>}
 */
const getPostById = async postId => {
  const post = await Post.findById(postId).populate(['postedBy'])

  return post
}

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {PostBody} body
 * @returns {Promise<Post>}
 */
const updatePostById = async (postId, body) => {
  const post = await Post.findByIdAndUpdate(postId, body, {
    new: true,
  }).populate('postedBy')

  if (!post) throw new createHttpError.NotFound('Not found post.')

  return post
}

/**
 * Update post by id
 * @param {Object} filter
 * @param {PostBody} body
 * @returns {Promise<Post>}
 */
const updateOne = async (filter, body) => {
  const post = await Post.findOneAndUpdate(filter, body, {
    new: true,
    populate: { path: 'postedBy' },
  })

  return post
}

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async postId => {
  const post = await Post.findByIdAndDelete(postId)

  // Delete all retweet post
  await deleteMany({ retweetData: post.id })

  // Remove image in cloudiness
  if (post?.image?.id) {
    uploadService.destroy(post.image.id)
  }

  if (!post) throw new createHttpError.NotFound('Not found post.')

  return post
}

/**
 * Delete post by id
 * @param {Object} filter
 * @returns {Promise<Post>}
 */
const deleteOne = async filter => {
  const post = await Post.findOneAndDelete(filter)

  // Remove image in cloudiness
  if (post?.image?.id) {
    uploadService.destroy(post.image.id)
  }

  if (post) await deleteMany({ retweetData: post?.id })

  return post
}

/**
 * Delete many posts
 * @param {Object} filter
 * @returns {Promise<{acknowledged: boolean, deletedCount: number}>}
 */
const deletePosts = async filter => {
  const posts = await Post.find(filter).select('+image.id')

  // Remove images in cloudiness
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
  updateOne,
  deletePostById,
  deletePosts,
  deleteOne,
}
