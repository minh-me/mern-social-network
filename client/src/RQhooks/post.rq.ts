import { authApi } from 'api/authApi';
import { postApi } from 'api/postApi';
import { userApi } from 'api/userApi';
import { addAuth, addUser } from 'context/actions';
import { useAppContext } from 'context/useAppContext';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { storage } from 'utils';
import { handlerError } from 'utils/handleError';

type options = {
  enable?: boolean;
};

export const useInfinitePosts = (params?: options) => {
  return useInfiniteQuery('posts', postApi.getPosts, {
    getNextPageParam: (lastPage) => {
      if (lastPage?.info?.page >= lastPage.info.totalPages) {
        return undefined;
      }
      return lastPage.info.page + 1;
    },
    ...params,
  });
};

export const usePosts = () => {};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(postApi.createPost, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: handlerError,
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (query) => {
          console.log({ query });
          return query.queryKey.toString().startsWith('posts');
        },
      }),
  });
};
