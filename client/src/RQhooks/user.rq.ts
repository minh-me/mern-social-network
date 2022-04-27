import { userApi } from 'api/userApi';
import { useInfiniteQuery, useQuery } from 'react-query';
import { handlerError } from 'utils/handleError';

export const useGetPofile = () => {
  return useQuery('profile', userApi.getProfile);
};

type options = {
  enabled?: boolean;
  cacheTime?: number;
  search?: string;
};

export const useInfiniteUsers = (params?: options) => {
  const queryKey = ['users'];
  if (params?.search) queryKey.push(params.search);

  return useInfiniteQuery(queryKey, userApi.getUsers, {
    getNextPageParam: (lastPage) => {
      if (lastPage?.info?.page >= lastPage.info.totalPages) {
        return undefined;
      }
      return lastPage.info.page + 1;
    },
    ...params,

    onError: handlerError,
  });
};
