import { authApi } from 'api/authApi';
import { postApi } from 'api/postApi';
import { userApi } from 'api/userApi';
import { addAuth, addUser } from 'context/actions';
import { useAppContext } from 'context/useAppContext';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { storage } from 'utils';
import { handlerError } from 'utils/handleError';

export const useInfinitePosts = () => {
  return useInfiniteQuery('posts', postApi.getPosts, {
    getNextPageParam: (lastPage) => {
      if (lastPage?.info?.page >= lastPage.info.totalPages) {
        return undefined;
      }
      return lastPage.info.page + 1;
    },
  });
};
