import cloudinary from 'cloudinary'
import fs from 'fs'
import { config } from '../config'

// Config cloudinary
cloudinary.v2.config(config.cloudinaryV2)

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 * @param {string} folder store in cloudinary
 */
const upload = async (path, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(path, options, (err, result) => {
      if (err) return reject(err)
      fs.unlinkSync(path)
      return resolve(result)
    })
  })
}
/**
 *
 * @param {string} cloudinary_id
 * @param {number} height
 * @param {number} width
 * @returns
 */

export const reSizeImage = (cloudinary_id, height, width) => {
  return cloudinary.url(cloudinary_id, {
    height,
    width,
    crop: 'scale',
    format: 'jpg',
  })
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadAvatar = async path => {
  const options = {
    folder: 'avatar',
    width: 150,
    height: 150,
    crop: 'fill',
  }
  const avatar = await upload(path, options)
  return avatar.secure_url
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadPostImage = async path => {
  const options = {
    folder: 'posts/images',
    // width: 150,
    // height: 150,
    crop: 'fill',
  }
  const result = await upload(path, options)
  return {
    url: result.secure_url,
    id: result.public_id,
    thumb1: reSizeImage(result.public_id, 200, 200),
    main: reSizeImage(result.public_id, 500, 500),
    thumb2: reSizeImage(result.public_id, 300, 300),
  }
}

/**
 *
 * @param {string} cloudinary_id
 * @returns
 */
export const destroy = async cloudinary_id => {
  const result = await cloudinary.uploader.destroy(cloudinary_id)
  console.log({ result })
  return result
}

export { upload, uploadAvatar, uploadPostImage }
