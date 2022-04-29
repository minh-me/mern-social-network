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

  checkbox_selection: yup.string().when(['text', 'image'], {
    is: (text, image) => !text && !image,
    then: yup.string().required(),
  }),
}

const deletePost = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export { createPost, getPosts, getPost, updatePost, deletePost }
