import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createComment = {
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
}

const getComments = {
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
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
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  checkbox_selection: yup.string().when(['firstName', 'lastName', 'email'], {
    is: (firstName, lastName, email) => !firstName && !lastName && !email,
    then: yup.string().required(),
  }),
}

const deleteComment = {
  commentId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export default {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
}
