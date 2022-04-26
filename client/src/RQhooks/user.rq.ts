import { userApi } from 'api/userApi';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useGetPofile = () => {
  return useQuery('profile', userApi.getProfile);
};

type options = {
  enabled?: boolean;
};

export const useInfiniteUsers = (params?: options) => {
  return useInfiniteQuery('users', userApi.getUsers, {
    getNextPageParam: (lastPage) => {
      if (lastPage?.info?.page >= lastPage.info.totalPages) {
        return undefined;
      }
      return lastPage.info.page + 1;
    },
    ...params,
  });
};
