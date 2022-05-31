/* eslint-disable security/detect-child-process */
import { spawn } from 'child_process'
import { config, logger } from '../../config'

const DB_NAME = config.app.db_name
const ARCHIVE_PATH = `${DB_NAME}.gzip`

// Handle restore database
function restoreBackup() {
  const child = spawn('mongorestore', [
    `--uri=${config.mongodbUrl}`,
    `--archive=${ARCHIVE_PATH}`,
    '--gzip',
  ])

  child.stdout.on('data', data => {
    logger.info(`stdout: ${data}`)
  })
  child.stderr.on('data', data => {
    logger.info(`stderr: ${Buffer.from(data).toString()}`)
  })
  child.on('error', error => {
    logger.error(error)
  })
  child.on('exit', (code, signal) => {
    if (code) logger.info(`Process exit with code: ${code}`)
    else if (signal) logger.info(`Process killed with signal: ${signal}`)
    else logger.info('Restore is successfully ✅')
  })
}

export { restoreBackup }
