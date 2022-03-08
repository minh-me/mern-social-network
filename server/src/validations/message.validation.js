import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createMessage = {
  sender: yup.string().required(),
  readBy: yup.string().required(),
  chat: yup.string().required(),
  text: yup.string(),
  image: yup.string(),
}

const getMessages = {
  chat: yup.string().required(),
  text: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  content: yup.string().required(),
}

const deleteMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createMessage, getMessages, getMessage, updateMessage, deleteMessage }
