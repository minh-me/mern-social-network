import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import {
  commentService,
  notificationService,
  postService,
  uploadService,
} from '../services'
import { notificationTypes } from '../services/notification.service'

/**
 * Create a comment
 * @POST api/comments/
 * @access private
 */
const createComment = catchAsync(async (req, res) => {
  const comment = req.body

  if (req.file) {
    const result = await uploadService.uploadImageComment(req.file.path)
    comment.image = result
  }

  // Add author
  comment.author = req.user.id

  // Create comment comment
  const result = await commentService.createComment(comment)

  // Add comment to post
  const post = await postService
    .updatePostById(comment.post, {
      $push: { comments: result.author },
    })
    .catch(error => {
      commentService.deleteCommentById(result.id)

      throw new Error(error)
    })

  // Create notification comment
  const userFrom = result.author
  const userTo = result.replyTo ? result.replyTo : post.postedBy._id.toString()
  const type = result.replyTo
    ? notificationTypes.commentUser
    : notificationTypes.commentPost

  if (userFrom !== userTo) {
    await notificationService.createNotificationComment(
      result.author,
      userTo,
      post._id,
      type
    )
  }

  res.status(201).json(result)
})

/**
 * Like comment
 * @Post api/comments/:commentId/like
 * @access private
 */
const likeComment = catchAsync(async (req, res) => {
  const { commentId } = req.params
  const { user } = req

  const comment = await commentService.getCommentById(commentId)

  const isLiked = comment.likes.includes(user.id)

  const options = isLiked ? '$pull' : '$addToSet'

  const updatedComment = await commentService.updateCommentById(commentId, {
    [options]: { likes: user.id },
  })

  // Create notification
  if (!isLiked && updatedComment.author.toString() !== user.id) {
    await notificationService.createNotificationLikeComment(
      user.id,
      updatedComment.author,
      updatedComment.post
    )
  }

  res.send(comment)
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

  if (!comment) throw createError.NotFound()

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

  // Delete comment id in post
  await postService.updatePostById(comment.post, {
    $pull: { comments: comment.id },
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
