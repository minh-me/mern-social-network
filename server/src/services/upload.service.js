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
  options.transformation = [{ quality: 60 }]
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
 * @returns {string}
 */

export const reSizeImage = (cloudinary_id, width, height) => {
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

  const result = await upload(path, options)

  return {
    url: result.secure_url,
    id: result.public_id,
  }
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadCoverPhoto = async path => {
  const options = {
    folder: 'cover_images',
    crop: 'fill',
  }

  const result = await upload(path, options)

  return {
    url: result.secure_url,
    pc: reSizeImage(result.public_id, 820, 312),
    mobile: reSizeImage(result.public_id, 640, 360),
    id: result.public_id,
  }
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadPostImage = async path => {
  const options = {
    folder: 'posts/images',
    // width: 480,
    crop: 'fill',
  }

  const result = await upload(path, options)

  return {
    url: result.secure_url,
    id: result.public_id,
  }
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadImageComment = async path => {
  const options = {
    folder: 'messages/images',
    // width: 400,
    crop: 'fill',
  }

  const result = await upload(path, options)

  return {
    url: result.secure_url,
    id: result.public_id,
  }
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadImageMessage = async path => {
  const options = {
    folder: 'messages/images',
    width: 300,
    crop: 'fill',
  }

  const result = await upload(path, options)

  return {
    url: result.secure_url,
    id: result.public_id,
  }
}

/**
 * Remove image uploaded in cloudinary
 * @param {string} cloudinary_id
 * @returns
 */
const destroy = async cloudinary_id => {
  const result = cloudinary.uploader.destroy(cloudinary_id)

  return result
}

export {
  upload,
  uploadAvatar,
  uploadPostImage,
  destroy,
  uploadCoverPhoto,
  uploadImageComment,
  uploadImageMessage,
}
