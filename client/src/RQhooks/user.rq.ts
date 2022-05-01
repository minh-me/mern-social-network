import { userApi } from 'api/user.api';
import { useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';

type options = {
  enabled?: boolean;
  cacheTime?: number;
  search?: string;
};

export const useGetPofile = ({ username = 'profile' }, options?: options) => {
  const key = username === 'profile' ? 'profile' : `username/${username}`;
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
  const queryClient = useQueryClient();
  const searchQuery = search ? `&search=${search}` : '';

  const queryKey = `users?page=${page}&limit=${limit}&sort=${sort}${searchQuery}`;

  queryClient.setQueryData('usersKey', queryKey);

  return useQuery(queryKey, userApi.getUsers, {
    ...options,
    onError: handlerError,
  });
};
