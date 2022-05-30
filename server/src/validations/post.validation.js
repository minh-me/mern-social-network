import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createPost = {
  text: yup.string(),
  image: yup.string(),
  pinned: yup.boolean().default(false),
}

const getPosts = {
  search: yup.string(),
  text: yup.string(),
  postedBy: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  hidden: yup.boolean(),
  pinned: yup.boolean(),
  onlyReply: yup.boolean(),
  followingOnly: yup.boolean(),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getPost = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updatePost = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  text: yup.string(),
  image: yup.string(),
  pinned: yup.boolean(),
  hidden: yup.boolean(),

  fields_update: yup.string().when(['text', 'image', 'hidden', 'pinned'], {
    is: (text, image, hidden, pinned) =>
      !text && !image && hidden === undefined && pinned === undefined,
    then: yup.string().required(),
  }),
}

const deletePost = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const postIdParams = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const retweetPost = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  text: yup.string(),
}
export {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  postIdParams,
  retweetPost,
}
