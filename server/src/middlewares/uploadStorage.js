import multer from 'multer'
import { config } from '../config'

const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    cb(null, config.app.upload_directory)
  },
  // filename
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  cb(null, true)
}

export const uploadStorage = multer({
  storage,
  fileFilter,
})
