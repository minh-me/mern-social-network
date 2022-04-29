import { postApi } from 'api/postApi';
import { useAppContext } from 'context/useAppContext';
import { Post, PostsResponse, UserResponse } from 'interface';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { DataUpdateFunction, Updater } from 'react-query/types/core/utils';
import { handlerError } from 'utils/handleError';

type options = {
  enabled?: boolean;
  cacheTime?: number;
  search?: string;
};

export const usePosts = (
  { search = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();

  const queryKey = `posts?page=${page}&limit=${limit}&sort=${sort}${
    search ? `&search=${search}` : ''
  }`;

  queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getPosts, {
    ...options,
    onError: handlerError,
  });
};

export const useMyPosts = ({ page = 1, limit = 1, sort = '-createdAt' }, options?: options) => {
  const queryClient = useQueryClient();
  const queryKey = `posts/me?page=${page}&limit=${limit}&sort=${sort}`;
  queryClient.setQueryData('myPostsKey', queryKey);

  return useQuery(queryKey, postApi.getPosts, {
    ...options,
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

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const {
    state: { user },
  } = useAppContext();
  return useMutation(postApi.likePost, {
    onMutate: (postId) => {
      const postsKey = queryClient.getQueryData<string>('postsKey');

      if (!postsKey || !user?.id) return;

      queryClient.setQueryData<PostsResponse | undefined>(postsKey, (oldData: any) => {
        const newPosts = oldData?.posts.map((post: Post) => {
          if (post.id === postId) {
            if (post.likes?.includes(user.id)) {
              post.likes?.splice(post.likes.indexOf(user.id), 1);
              return post;
            }

            return { ...post, likes: post.likes?.concat(user.id) };
          }

          return post;
        });

        return { ...oldData, posts: newPosts };
      });
    },

    onSuccess: () => {},
    onError: handlerError,
  });
};
