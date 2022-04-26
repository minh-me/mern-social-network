import { authApi } from 'api/authApi';
import { userApi } from 'api/userApi';
import { addAuth, addUser } from 'context/actions';
import { useAppContext } from 'context/useAppContext';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { storage } from 'utils';
import { handlerError } from 'utils/handleError';

export const useGetPofile = () => {
  return useQuery('profile', userApi.getProfile);
};

type options = {
  enable?: boolean;
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
