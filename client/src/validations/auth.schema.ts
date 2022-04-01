import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

export const registerSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  name: yup.string().required().label('Name'),
  password: yup.string().required().label('Password'),
  dateOfBirth: yup.date().required().label('Date Of Birth'),
});

export const emailSchema = yup.object({
  email: yup.string().email().required().label('Email'),
});

export const passwordSchema = yup.object({
  password: yup.string().required().label('Password'),
});
