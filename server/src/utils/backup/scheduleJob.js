import schedule from 'node-schedule'
import { backupMongoDB } from './backupMongoDB'

/**
 * Time schedule job
 * second (0-59)
 * minute (0-59)
 * hour (0-23)
 * date (1-31)
 * month (0-11)
 * year
 * dayOfWeek (0-6) Starting with Sunday
 */

const scheduleJob = () => {
  //  Every day at 23:18, run the job.
  schedule.scheduleJob({ hour: 23, minute: 18 }, () => backupMongoDB())
}

export { scheduleJob }
