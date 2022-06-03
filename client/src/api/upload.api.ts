import { UploadSingleResponse } from '~/interface';
import axiosInstance from '~/utils/axiosInstance';

const uploadUrl = '/api/uploads';
const configHeader = { 'Content-Type': 'multipart/form-data' };

export const uploadApi = {
  uploadCoverPhoto(image: {}): Promise<UploadSingleResponse> {
    return axiosInstance.post(`${uploadUrl}/cover_photo`, image, {
      headers: configHeader,
    });
  },
  uploadProfilePic(image: {}): Promise<UploadSingleResponse> {
    return axiosInstance.post(`${uploadUrl}/avatar`, image, {
      headers: configHeader,
    });
  },

  uploadImageComment(image: {}): Promise<UploadSingleResponse> {
    return axiosInstance.post(`${uploadUrl}/image_comment`, image, {
      headers: configHeader,
    });
  },
};
