import createError from 'http-errors'
import { postService, uploadService } from '.'
import { User } from '../models'

/**
 * Get users by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<users>}
 */
const queryUsers = async (filter, options) => {
  const customLabels = {
    docs: 'users',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
  }
  options = { ...options, customLabels }
  const users = await User.paginate(filter, options)
  return users
}

/**
 * Find user by id
 * @param {ObjectId} userId
 * @returns {Promise<user>}
 */
const getUserById = async userId => {
  const user = await User.findById(userId).populate(['followers', 'following'])
  return user
}

/**
 * Find user by email
 * @param {string} email
 * @returns {Promise<user>}
 */
const getUserByEmail = async email => {
  const user = await User.findOne({ email }).select('+password')
  return user
}

/**
 * Find user by email
 * @param {string} username
 * @returns {Promise<user>}
 */
const getUserByUsername = async username => {
  const user = await User.findOne({ username }).populate([
    'followers',
    'following',
  ])
  return user
}

/**
 * Find user by googleId
 * @param {string} googleId
 * @returns {Promise<user>}
 */
const getUserByGoogleId = async googleId => {
  const user = await User.findOne({ googleId })
  return user
}

/**
 * Create user
 * @param {Object} body
 * @returns {Promise<user>}
 */
const createUser = async userBody => {
  const user = await getUserByEmail(userBody.email)
  if (user) {
    throw createError.BadRequest('Email already exists')
  }
  const newUser = await User.create(userBody)
  return newUser
}

/**
 * Create user
 * @param {Object} googleData
 * @returns {Promise<user>}
 */
const createUserByGoogle = async googleData => {
  const user = await getUserByEmail(googleData.email)
  if (user)
    return User.findByIdAndUpdate(
      user.id,
      { googleId: googleData.googleId },
      { new: true }
    )
  const newUser = await User.create(googleData)
  return newUser
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<user>}
 */
const updateUserById = async (userId, body) => {
  const user = await getUserById(userId)

  if (!user) {
    throw createError.NotFound()
  }

  if (body.email && (await getUserByEmail(body.email))) {
    throw createError.BadRequest('Email already exists')
  }

  Object.assign(user, body)
  await user.save()
  return user
}

/**
 * Update One
 * @param {ObjectId} userId
 * @param {userBody} body
 * @returns {Promise<User>}
 */

const updateById = async (userId, body) => {
  const user = await User.findByIdAndUpdate(userId, body, { new: true })
  if (!user) throw createError.NotFound('Not found user.')
  return user
}

/**
 * Remove old avatar and update new avatar
 * @param {ObjectId} userId
 * @param {Object} avatar
 * @returns
 */
const updateProfilePic = async (userId, avatar) => {
  const user = await User.findByIdAndUpdate(userId, avatar).select(
    '+profilePic.id'
  )
  if (user.profilePic?.id) {
    await uploadService.destroy(user.profilePic.id)
  }
  return user
}

/**
 * Remove old avatar and update new avatar
 * @param {ObjectId} userId
 * @param {Object} coverPhoto
 * @returns
 */
const updateCoverPhoto = async (userId, coverPhoto) => {
  const user = await User.findByIdAndUpdate(userId, coverPhoto).select(
    '+coverPhoto.id'
  )
  if (user.coverPhoto?.id) {
    await uploadService.destroy(user.coverPhoto.id)
  }
  return user
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<user>}
 */
const updateUserPasswordById = async (userId, body) => {
  const user = await getUserById(userId)
  if (!user) {
    throw createError.NotFound()
  }
  Object.assign(user, body)
  await user.save()
  return user
}

/**
 * Delte user by id
 * @param {ObjectId} userId
 * @returns {Promise<user>}
 */
const deleteUserById = async userId => {
  const user = await getUserById(userId)
  if (!user) {
    throw createError.NotFound()
  }

  if (user.coverPhoto?.id) {
    await uploadService.destroy(user.coverPhoto.id)
  }

  if (user.profilePic?.id) {
    await uploadService.destroy(user.profilePic.id)
  }

  // Delete all posts by posted=user
  await postService.deletePosts({ postedBy: user.id })
  const result = await user.remove()

  // success
  return result
}

export {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  updateUserPasswordById,
  getUserByGoogleId,
  createUserByGoogle,
  updateById,
  updateProfilePic,
  updateCoverPhoto,
  getUserByUsername,
}
