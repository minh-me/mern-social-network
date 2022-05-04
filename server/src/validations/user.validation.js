import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const createUser = {
  name: yup.string().trim().min(2).required(),
  email: yup.string().required().email(),
  dateOfBirth: yup.date(),
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

const getUsers = {
  search: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  username: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string(),
}

const getUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const getUserByUsername = {
  username: yup.string().required(),
}

const updateUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  name: yup.string(),
  email: yup.string().email(),
  dateOfBirth: yup.date(),
  checkbox_selection: yup.string().when(['name', 'email'], {
    is: (name, email) => !name && !email,
    then: yup.string().required(),
  }),
}

const userId = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateProfile = {
  name: yup.string(),
  email: yup.string().email(),
  dateOfBirth: yup.date(),
  name_or_email: yup.string().when(['name', 'email', 'dateOfBirth'], {
    is: (name, email, dateOfBirth) => !name && !email && !dateOfBirth,
    then: yup.string().required(),
  }),
}

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  userId,
  updateProfile,
  getUserByUsername,
}
