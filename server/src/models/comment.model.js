import mongoose, { Schema } from 'mongoose'
import { paginate, toJSON } from './plugins'

const commentSchema = mongoose.Schema(
  {
    text: { type: String, trim: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    image: {
      id: { type: String, select: false },
      url: String,
    },
    replyTo: { type: Schema.Types.ObjectId, ref: 'User' },
    parentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON)
commentSchema.plugin(paginate)

/**
 * @typedef Comment
 */
export const Comment = mongoose.model('Comment', commentSchema)
