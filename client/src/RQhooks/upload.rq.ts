import { useMutation, useQueryClient } from 'react-query';
import { uploadApi } from '~/api/upload.api';
import { handlerError } from '~/utils/handleError';

export const useUploadCoverPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation('upload_cover_photo', uploadApi.uploadCoverPhoto, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => query.queryKey === 'users/profile',
      });
    },
  });
};

export const useUploadProfilePic = () => {
  const queryClient = useQueryClient();
  return useMutation('upload_profile_pic', uploadApi.uploadProfilePic, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => query.queryKey === 'users/profile',
      });
    },
  });
};

export const useUploadImageComment = () => {
  return useMutation(uploadApi.uploadImageComment, {
    onError: handlerError,
  });
};
