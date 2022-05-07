import catchAsync from '../utils/catchAsync'
import { uploadService, userService } from '../services'

/**
 * Upload avatar
 * @POST api/uploads/avatar
 * @access private
 */
const uploadAvatar = catchAsync(async (req, res) => {
  const avatar = await uploadService.uploadAvatar(req.file.path)

  await userService.updateProfilePic(req.user.id, { profilePic: avatar })

  return res.send({ url: avatar.url })
})

/**
 * Upload cover photo
 * @POST api/uploads/cover_photo
 * @access private
 */
const uploadCoverPhoto = catchAsync(async (req, res) => {
  const coverPhoto = await uploadService.uploadCoverPhoto(req.file.path)

  await userService.updateCoverPhoto(req.user.id, { coverPhoto })

  return res.send({ url: coverPhoto.url })
})

/**
 * Upload cover photo
 * @POST api/uploads/cover_photo
 * @access private
 */
const uploadImageComment = catchAsync(async (req, res) => {
  const image = await uploadService.uploadImageComment(req.file.path)
  return res.send(image)
})

export { uploadAvatar, uploadCoverPhoto, uploadImageComment }
