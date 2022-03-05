import mongoose from 'mongoose'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
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
const Comment = mongoose.model('Comment', commentSchema)

export default Comment
