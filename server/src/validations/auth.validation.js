import * as yup from 'yup'
import { transValidations } from '../_lang/en'
import config from './config.validation'

const activate = {
  activation_token: yup.string().required(),
}

const login = {
  email: yup.string().required(),
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

const google = {
  email: yup.string().required(),
  googleId: yup.string().required(),
  imageUrl: yup.string(),
  name: yup.string().required(),
}

const forgotPassword = {
  email: yup.string().email().required(),
}

const resetPassword = {
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

export { activate, login, forgotPassword, resetPassword, google }
