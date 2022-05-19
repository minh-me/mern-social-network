import fs from 'fs'
import createHttpError from 'http-errors'
import { config } from '../config'
import { transErrors } from '../_lang/en'

export const upload = (req, res, next) => {
  // check file exist
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  if (typeof req.file === 'undefined' || typeof req.body === 'undefined')
    throw new createHttpError.BadRequest(transErrors.upload_issue)

  // app use upload
  const image = req.file.path
  // file type
  if (!config.app.image_types.includes(req.file.mimetype)) {
    // remove file
    fs.unlinkSync(image)
    throw new createHttpError.BadRequest(transErrors.upload_not_supported)
  }

  // file size
  if (req.file.size > config.app.upload_limit_size) {
    // remove file
    fs.unlinkSync(image)
    throw new createHttpError.BadRequest(transErrors.upload_limit_size)
  }

  // success
  next()
}

export const uploadPostImage = (req, res, next) => {
  if (typeof req.file === 'undefined' && typeof req.body === 'undefined')
    throw new createHttpError.BadRequest(transErrors.upload_issue)

  if (req.file) {
    const image = req.file.path
    if (!config.app.image_types.includes(req.file.mimetype)) {
      fs.unlinkSync(image)
      throw new createHttpError.BadRequest(transErrors.upload_not_supported)
    }

    if (req.file.size > config.app.upload_limit_size) {
      fs.unlinkSync(image)
      throw new createHttpError.BadRequest(transErrors.upload_limit_size)
    }
  }

  next()
}

export const uploadImage = (req, res, next) => {
  if (typeof req.file === 'undefined' && typeof req.body === 'undefined')
    throw new createHttpError.BadRequest(transErrors.upload_issue)

  if (typeof req.file === 'undefined' && !req.body.text)
    throw new createHttpError.BadRequest('Please enter content comment.')

  if (req.file) {
    const image = req.file.path
    if (!config.app.image_types.includes(req.file.mimetype)) {
      fs.unlinkSync(image)
      throw new createHttpError.BadRequest(transErrors.upload_not_supported)
    }

    if (req.file.size > config.app.upload_limit_size) {
      fs.unlinkSync(image)
      throw new createHttpError.BadRequest(transErrors.upload_limit_size)
    }
  }

  next()
}
