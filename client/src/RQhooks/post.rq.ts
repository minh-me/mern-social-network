import { postApi } from 'api/postApi';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';

type options = {
  enabled?: boolean;
  cacheTime?: number;
  search?: string;
};

export const useInfinitePosts = (params?: options) => {
  const queryKey = ['posts'];
  if (params?.search) queryKey.push(params.search);

  return useInfiniteQuery(queryKey, postApi.getPosts, {
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
