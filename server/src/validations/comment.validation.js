import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createComment = {
  content: yup.string().required(),
  post: yup.string().required(),
}

const getComments = {
  content: yup.string(),
  post: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  user: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getComment = {
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateComment = {
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  content: yup.string().required(),
}

const deleteComment = {
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createComment, getComments, getComment, updateComment, deleteComment }
