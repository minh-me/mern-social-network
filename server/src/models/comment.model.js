import mongoose, { Schema } from 'mongoose'
import { paginate, toJSON } from './plugins'

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    reply: { type: Schema.Types.ObjectId, ref: 'Comment', index: true },
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
