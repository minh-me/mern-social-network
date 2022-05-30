import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createChat = {
  chatName: yup.string(),
  isGroupChat: yup.boolean().required().default(false),
  users: yup
    .array()
    .of(
      yup
        .string()
        .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
        .required()
    ),
}

const getChats = {
  chatName: yup.string(),
  isGroupChat: yup.string(),
  latestMessage: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getChat = {
  chatId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const getChatByUserId = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateChat = {
  chatId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  chatName: yup.string().required(),
}

const deleteChat = {
  chatId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export {
  createChat,
  getChats,
  getChat,
  getChatByUserId,
  updateChat,
  deleteChat,
}
