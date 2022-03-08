import mongoose from 'mongoose'
import { config } from './config'
import { logger } from './logger'

export const connect = async () => {
  const options = {}
  const conn = await mongoose.connect(config.mongodbUrl, options)
  logger.info(`MongDB Connected: ${conn.connection.host}`.yellow.bold.underline)
}
