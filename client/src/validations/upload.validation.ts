import * as yup from 'yup';
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_SIZE = 3145728; // 3MB

export const uploadSchema = yup.object({
  image: yup
    .mixed()
    .test('fileSize', 'This file is too large (Max: 3MB ).', (value: FileList) => {
      return value && value.length > 0 ? value[0].size <= MAX_SIZE : true;
    })
    .test(
      'fileType',
      'This file is not supported.(file support: jpg,jpeg,git,png)',
      (value: FileList) =>
        value && value.length > 0 ? SUPPORTED_FORMATS.includes(value[0].type) : true
    )
    .required()
    .label('Image'),
});

export const uploadAvatarSchema = yup.object({
  file: yup
    .mixed()
    .test('fileSize', 'This file is too large (Max: 3MB ).', (value: FileList) => {
      return value && value.length > 0 ? value[0].size <= MAX_SIZE : true;
    })
    .test(
      'fileType',
      'This file is not supported.(file support: jpg,jpeg,git,png)',
      (value: FileList) =>
        value && value.length > 0 ? SUPPORTED_FORMATS.includes(value[0].type) : true
    )
    .required()
    .label('Image'),
});
