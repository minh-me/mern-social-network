import mongoose, { Schema } from 'mongoose'
import deepPopulate from 'mongoose-deep-populate'

import { paginate, toJSON } from './plugins'

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON)
chatSchema.plugin(paginate)
chatSchema.plugin(deepPopulate(mongoose))

/**
 * @typedef Chat
 */
export const Chat = mongoose.model('Chat', chatSchema)
