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
  type: yup.string().oneOf(['follow', 'like']).required(),
  entityId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const getNotifications = {
  opened: yup.boolean(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const count = {
  opened: yup.boolean(),
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
  opened: yup.boolean(),
}

const updateNotifications = {
  opened: yup.boolean(),
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
  updateNotifications,
  deleteNotification,
  count,
}
