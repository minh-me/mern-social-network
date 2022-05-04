import { UploadSingleResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const uploadUrl = '/api/uploads';

export const uploadApi = {
  uploadCoverPhoto(image: {}): Promise<UploadSingleResponse> {
    return axiosInstance.post(`${uploadUrl}/cover_photo`, image, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadProfilePic(image: {}): Promise<UploadSingleResponse> {
    return axiosInstance.post(`${uploadUrl}/avatar`, image, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  uploadImageComment(image: {}): Promise<UploadSingleResponse> {
    return axiosInstance.post(`${uploadUrl}/image_comment`, image, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
