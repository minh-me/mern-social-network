import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { commentService, postService, uploadService } from '../services'

/**
 * Create a comment
 * @POST api/comments/
 * @access private
 */
const createComment = catchAsync(async (req, res) => {
  const item = req.body

  if (req.file) {
    const result = await uploadService.uploadImageComment(req.file.path)
    item.image = result
  }

  const comment = await commentService.createComment({
    ...item,
    author: req.user.id,
  })

  await postService
    .updatePostById(comment.post, {
      $push: { comments: comment.id },
    })
    .catch(error => {
      commentService.deleteCommentById(comment.id)
      throw new Error(error)
    })

  res.status(201).json(comment)
})

/**
 * Get all comments
 * @GET api/comments
 * @access public
 */
const getComments = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'post',
    'comment',
    'replyTo',
    'author',
    'parentId',
  ])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])
  options.populate = 'author,replyTo,post,post.postedBy'
  const result = await commentService.queryComments(filter, options)
  res.send(result)
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
  await postService.updatePostById(comment.post, {
    $pull: { comments: comment.id },
  })
  res.send(comment)
})

/**
 * Like comment
 * @Post api/comments/:commentId/like
 * @access private
 */
const likeComment = catchAsync(async (req, res) => {
  const { commentId } = req.params
  const { user } = req

  let comment = await commentService.getCommentById(commentId)

  const options = comment.likes.includes(user.id) ? '$pull' : '$addToSet'

  comment = await commentService.updateCommentById(commentId, {
    [options]: { likes: user.id },
  })

  res.send(comment)
})

export {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  likeComment,
}
