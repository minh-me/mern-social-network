import mongoose, { Schema } from 'mongoose'
import { paginate, toJSON } from './plugins'

const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
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
