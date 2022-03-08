import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { postService } from '../services'
import { tranSuccess } from '../_lang/en'

/**
 * Create a post
 * @POST api/posts/
 * @access private
 */
const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost({
    ...req.body,
    postedBy: req.user.id,
  })
  res.status(201).json(post)
})

/**
 * Get all posts
 * @GET api/posts
 * @access public
 */
const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['text'])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await postService.queryPosts(filter, options)
  res.send(result)
})

/**
 * Get a post by post id
 * @GET api/posts/:postId
 * @access public
 */
const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId)
  if (!post) {
    throw createError.NotFound()
  }
  res.send(post)
})

/**
 * Update a post by postId
 * @PATCH api/posts/:postId
 * @access private
 */
const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePostById(req.params.postId, req.body)
  res.send(post)
})

/**
 * Delete post by postId
 * @DELETE api/posts/:postId
 * @access private
 */
const deletePost = catchAsync(async (req, res) => {
  let post = await postService.deletePostById(req.params.postId)
  res.send(post)
})

export { createPost, getPosts, getPost, updatePost, deletePost }
