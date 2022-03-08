import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createNotification = {
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
}

const getNotifications = {
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
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
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  checkbox_selection: yup.string().when(['firstName', 'lastName', 'email'], {
    is: (firstName, lastName, email) => !firstName && !lastName && !email,
    then: yup.string().required(),
  }),
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