import { notificationApi } from 'api/notification.api';
import { Chat } from 'interface';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

export const useNotifications = (
  { page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryKey = `notifications?page=${page}&limit=${limit}&sort=${sort}`;

  return useQuery(queryKey, notificationApi.getNotifications, {
    onError: handlerError,
    ...options,
  });
};

export const useDeleteNotification = () => {
  return useMutation('delete-notification', notificationApi.deleteNotification, {
    onError: handlerError,
    onSuccess: (data) => {
      console.log({ data });
    },
  });
};
