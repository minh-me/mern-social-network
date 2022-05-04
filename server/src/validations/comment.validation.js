import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createComment = {
  text: yup.string(),
  post: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  replyTo: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  parentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
}

const getComments = {
  text: yup.string(),
  post: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  author: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  replyTo: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  parentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
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
  text: yup.string().required(),
}

const deleteComment = {
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}
const commentId = {
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
  commentId,
}
