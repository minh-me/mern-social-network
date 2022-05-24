import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { roles } from '../config'
import { transValidations } from '../_lang/en'
import { toJSON, paginate } from './plugins'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, transValidations.email_incorrect],
    },
    password: {
      type: String,
      trim: true,
      match: [passwordRegex, transValidations.password_incorrect],
      select: false,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    dateOfBirth: {
      type: Date,
    },
    coverPhoto: {
      id: { type: String, select: false },
      url: String,
      pc: String,
      mobile: String,
    },
    profilePic: {
      type: {
        id: { type: String, select: false },
        url: String,
      },
      default: {
        url: 'https://res.cloudinary.com/dvnmolznq/image/upload/v1651309698/avatar/h65dgi9kmuusnuzoi5pb.png',
      },
    },
    googleId: {
      type: String,
      index: true,
    },

    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    numberFollowers: Number,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  if (this.isModified('email')) {
    this.username = this.email.split('@')[0]
  }

  next()
})

userSchema.methods = {
  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password)
  },
}

// add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

userSchema.index({ name: 'text', email: 'text', username: 'text' })

/**
 * @typedef User
 */
export const User = mongoose.model('User', userSchema)
