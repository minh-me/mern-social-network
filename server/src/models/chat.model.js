import mongoose, { Schema } from 'mongoose'
import { paginate, toJSON } from './plugins'

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
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
