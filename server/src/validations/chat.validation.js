import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createChat = {
  chatName: yup.string(),
  isGroupChat: yup.boolean().required().default(false),
  lastestMessage: yup.string(),
}

const getChats = {
  chatName: yup.string(),
  isGroupChat: yup.string(),
  lastestMessage: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getChat = {
  chatId: yup
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

export default {
  createChat,
  getChats,
  getChat,
  updateChat,
  deleteChat,
}
