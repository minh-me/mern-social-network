import { notificationApi } from '~/api/notification.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from '~/utils/handleError';
import { options } from './options.type';

export const useNotifications = (
  { page = 1, limit = 1, sort = 'opened,-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();
  const queryKey = `notifications?page=${page}&limit=${limit}&sort=${sort}`;

  queryClient.setQueryData('notificationsKey', queryKey);

  return useQuery(queryKey, notificationApi.getNotifications, {
    onError: handlerError,
    ...options,
  });
};

export const useNotificationLatest = (options?: options) => {
  return useQuery('notification-latest', notificationApi.getNotificationLatest, {
    onError: handlerError,
    ...options,
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(notificationApi.deleteNotification, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.toString().startsWith('notifications');
        },
      });
    },
  });
};

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(notificationApi.updateNotification, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.toString().startsWith('notifications');
        },
      });
    },
  });
};

export const useUpdateManyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(notificationApi.updateMany, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.toString().startsWith('notifications');
        },
      });
    },
  });
};
