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
  text: yup.string().required(),
  image: yup.string(),
}

const getMessages = {
  chat: yup.string(),
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

const updateMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  text: yup.string().required(),
}

const deleteMessage = {
  messageId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createMessage, getMessages, getMessage, updateMessage, deleteMessage }
