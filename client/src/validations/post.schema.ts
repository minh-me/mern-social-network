import * as yup from 'yup';
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const MAX_SIZE = 3145728; // 3MB

export const postSchema = yup.object({
  text: yup.string().required().trim().label('Content'),
  image: yup
    .mixed()
    .test('fileSize', 'This file is too large (Max: 3MB ).', (value: FileList) => {
      return value ? value[0].size <= MAX_SIZE : true;
    })
    .test(
      'fileType',
      'This file is not supported.(file support: jpg,jpeg,git,png)',
      (value: FileList) => (value ? SUPPORTED_FORMATS.includes(value[0].type) : true)
    )
    .label('Image'),
});
