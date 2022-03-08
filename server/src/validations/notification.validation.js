import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createNotification = {
  userTo: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  userFrom: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  notificationType: yup.string().oneOf(['follow', 'like']).required(),
  entityId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const getNotifications = {
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getNotification = {
  notificationId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateNotification = {
  notificationId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const deleteNotification = {
  notificationId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
}
