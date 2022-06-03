import { userApi } from '~/api/user.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from '~/utils/handleError';
import { options } from './options.type';

export const useUserProfile = ({ username = 'profile' }, options?: options) => {
  const key = username === 'profile' ? 'profile' : `${username}/username`;
  const queryKey = `users/${key}`;

  return useQuery(queryKey, userApi.getProfile, {
    onError: handlerError,
    ...options,
  });
};

export const useUsers = (
  { search = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const searchQuery = search ? `&search=${search}` : '';
  const queryKey = `users?page=${page}&limit=${limit}&sort=${sort}${searchQuery}`;

  return useQuery(queryKey, userApi.getUsers, {
    onError: handlerError,
    ...options,
  });
};

export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(userApi.follow, {
    onError: handlerError,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.toString().startsWith('users');
        },
      });
    },
  });
};
