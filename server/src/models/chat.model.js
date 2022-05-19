import mongoose, { Schema } from 'mongoose'
import slug from 'mongoose-slug-updater'
import { paginate, toJSON } from './plugins'

// add plugin slug
mongoose.plugin(slug)

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    slug: { type: String, slug: 'chatName', unique: true, slugPaddingSize: 2 },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON)
chatSchema.plugin(paginate)

/**
 * @typedef Chat
 */
export const Chat = mongoose.model('Chat', chatSchema)
