import mongoose, { Schema } from 'mongoose'
import { paginate, toJSON } from './plugins'

const messageSchema = mongoose.Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    text: { type: String },
    isRename: { type: Boolean, default: false },
    image: {
      id: { type: String, select: false },
      url: String,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
messageSchema.plugin(toJSON)
messageSchema.plugin(paginate)

/**
 * @typedef Message
 */
export const Message = mongoose.model('Message', messageSchema)
