import mongoose, { Schema } from 'mongoose'
import { paginate, toJSON } from './plugins'

const notificationSchema = new Schema(
  {
    userTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userFrom: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: String,
    opened: { type: Boolean, default: false },
    entityId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
)

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON)
notificationSchema.plugin(paginate)

/**
 * @typedef Notification
 */
export const Notification = mongoose.model('Notification', notificationSchema)
