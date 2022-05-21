import { postApi } from 'api/post.api';
import { AxiosError } from 'axios';
import { useAuthContext } from 'hooks/useAppContext';
import { Post } from 'interface';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

export const usePosts = (
  { postedBy = '', search = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();
  const searchQuery = search ? `&search=${search}` : '';
  const postedByQuery = postedBy ? `&postedBy=${postedBy}` : '';

  const queryKey = `posts?page=${page}&limit=${limit}&sort=${sort}${searchQuery}${postedByQuery}`;
  queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getPosts, {
    onError: handlerError,
    ...options,
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
  const { auth } = useAuthContext();
  const postsKey = queryClient.getQueryData<string>('postsKey');

  return useMutation(postApi.likePost, {
    onMutate: (postId) => {
      if (!postsKey || !auth) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, auth.id);
      });
    },

    onSuccess: () => {},
    onError: (err: Error | AxiosError<any, any>, postId) => {
      if (!postsKey || !auth) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, auth.id);
      });
      handlerError(err);
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
