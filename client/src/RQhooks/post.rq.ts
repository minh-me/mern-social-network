import { postApi } from 'api/postApi';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';

type options = {
  enabled?: boolean;
};

export const useInfinitePosts = (params?: options) => {
  console.log({ params });
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

export const useInfiniteMyPosts = (params?: options) => {
  return useInfiniteQuery('my-posts', postApi.getMyPosts, {
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
