import { postApi } from 'api/post.api';
import { AxiosError } from 'axios';
import { useAppContext } from 'hooks/useAppContext';
import { Post } from 'interface';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';

type options = {
  enabled?: boolean;
  cacheTime?: number;
  staleTime?: number;
  search?: string;
};

export const usePosts = (
  { search = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();
  const searchQuery = search ? `&search=${search}` : '';

  const queryKey = `posts?page=${page}&limit=${limit}&sort=${sort}${searchQuery}`;
  queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getPosts, {
    ...options,
    onError: handlerError,
  });
};

export const usePostsByPostedBy = (
  { userId = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();

  const queryKey = `posts/${userId}/postedBy?page=${page}&limit=${limit}&sort=${sort}`;

  queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getPostsByPostedBy, {
    ...options,
    onError: handlerError,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const postsKey = queryClient.getQueryData('postsKey');

  return useMutation(postApi.createPost, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey === postsKey;
        },
      });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const {
    state: { auth },
  } = useAppContext();
  const postsKey = queryClient.getQueryData<string>('postsKey');

  return useMutation(postApi.likePost, {
    onMutate: (postId) => {
      if (!postsKey || !auth?.user.id) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, auth?.user.id);
      });
    },

    onSuccess: () => {},
    onError: (err: Error | AxiosError<any, any>, postId) => {
      if (!postsKey || !auth?.user.id) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, auth?.user.id);
      });
      handlerError(err);
    },
    onSettled: (data) => {
      console.log({ data });
      // return queryClient.invalidateQueries({
      //   predicate: (query) => query.queryKey.toString().startsWith('posts'),
      // });
    },
  });
};

const updatePostLikes = (oldData: any, postId: string, userId: string) => {
  const newPosts = oldData?.posts.map((post: Post) => {
    if (post.id === postId) {
      if (post.likes?.includes(userId)) {
        const likes = post.likes.filter((id) => id !== userId);
        return { ...post, likes: likes };
      }
      return { ...post, likes: post.likes?.concat(userId) };
    }
    return post;
  });

  return { ...oldData, posts: newPosts };
};
