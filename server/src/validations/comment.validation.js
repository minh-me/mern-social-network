import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createComment = {
  content: yup.string().required(),
  post: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const replyComment = {
  content: yup.string().required(),
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
}

const getCommentsByPost = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
}

const getComments = {
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
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
  content: yup.string().required(),
}

const commendId = {
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
  commendId,
  replyComment,
  getCommentsByPost,
}
