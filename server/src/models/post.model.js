import mongoose, { Schema } from 'mongoose'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const postSchema = Schema(
  {
    text: String,
    image: String,
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    pinned: Boolean,
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    retweetData: { type: Schema.Types.ObjectId, ref: 'Post' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
postSchema.plugin(toJSON)
postSchema.plugin(paginate)

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema)

export default Post
