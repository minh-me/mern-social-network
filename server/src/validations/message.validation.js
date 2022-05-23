import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createMessage = {
  readBy: yup
    .array()
    .of(
      yup
        .string()
        .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    )
    .nullable(true),
  chat: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  text: yup.string(),
  image: yup.string(),
  isRename: yup.boolean(),
}

const getMessages = {
  chat: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  text: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const addToReadBy = {
  chatId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  text: yup.string().required(),
  isRename: yup.boolean(),
}

const deleteMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  addToReadBy,
  deleteMessage,
}
