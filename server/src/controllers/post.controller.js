import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import {
  commentService,
  postService,
  uploadService,
  userService,
} from '../services'

/**
 * Create a post
 * @POST api/posts/
 * @access private
 */
const createPost = catchAsync(async (req, res) => {
  const item = req.body
  if (req.file) {
    const url = await uploadService.uploadPostImage(req.file.path)
    item.image = url
  }
  const post = await postService.createPost({
    ...item,
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
  const filter = pick(req.query, ['text', 'search', 'postedBy'])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])

  options.populate = 'postedBy'
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
  const post = await postService.deletePostById(req.params.postId)

  // Delete all comments in post
  await commentService.deleteMany({ post: post.id })
  res.send(post)
})

/**
 * Like post
 * @Patch api/posts/:postId/like
 * @access private
 */
const likePost = catchAsync(async (req, res) => {
  const { postId } = req.params
  const { user } = req

  const isLiked = user.likes && user.likes.includes(postId)
  const options = isLiked ? '$pull' : '$addToSet'

  const postUpdated = await postService.updatePostById(postId, {
    [options]: { likes: user.id },
  })

  const userUpdated = await userService.updateById(user.id, {
    [options]: { likes: postId },
  })

  req.user = userUpdated

  res.send(postUpdated)
})

export { createPost, getPosts, getPost, updatePost, deletePost, likePost }
