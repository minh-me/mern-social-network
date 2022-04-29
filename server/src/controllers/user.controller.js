import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { userService } from '../services'
import { tranSuccess } from '../_lang/en'

/**
 * Create a user
 * @POST api/users/
 * @access private
 */
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  res.status(201).json(user)
})

/**
 * Get all users
 * @GET api/users
 * @access public
 */
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'firstName',
    'lastName',
    'role',
    'email',
    'search',
  ])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])

  filter._id = { $ne: req.user.id }
  const result = await userService.queryUsers(filter, options)
  res.send(result)
})

/**
 * Get a user by user id
 * @GET api/users/:userId
 * @access public
 */
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw createError.NotFound()
  }
  res.send(user)
})

/**
 * Update a user by userId
 * @PATCH api/users/:userId
 * @access private
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body)
  res.send(user)
})

/**
 * Delete user by userId
 * @DELETE api/users/:userId
 * @access private
 */
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId)
  res.status(200).json({ message: tranSuccess.deleted_success('user') })
})

/**
 * Get info user when logged in
 * @GET api/users/me
 * @access private
 */
const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id)
  res.send(user)
})

/**
 * Update user when logged in
 * @PATCH api/users/update-me
 * @access private
 */
const updateProfile = catchAsync(async (req, res, next) => {
  const user = await userService.updateUserById(req.user.id, req.body)
  res.send(user)
})

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
}
