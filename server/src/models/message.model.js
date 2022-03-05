import mongoose, { Schema } from 'mongoose'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const messageSchema = mongoose.Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    text: { type: String },
    image: { type: String },
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
const Message = mongoose.model('Message', messageSchema)

export default Message
