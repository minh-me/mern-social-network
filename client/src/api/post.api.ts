import { Post, PostsResponse } from '~/interface';
import axiosInstance from '~/utils/axiosInstance';

const postUrl = '/api/posts';
export const postApi = {
  getPosts({ queryKey = ['posts?page=1'] }): Promise<PostsResponse> {
    const endpoint = queryKey[0];

    return axiosInstance.get(`api/${endpoint}`);
  },

  getProfilePosts({ queryKey = ['posts/profile?page=1'] }): Promise<PostsResponse> {
    const endpoint = queryKey[0];

    return axiosInstance.get(`api/${endpoint}`);
  },

  getPost(postId: string): Promise<Post> {
    return axiosInstance.get(`${postUrl}/${postId}`);
  },

  createPost(post: {}): Promise<Post> {
    return axiosInstance.post(`${postUrl}`, post, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updatePost(postData: { filter: { id: string }; body: {} }): Promise<Post> {
    const { filter, body } = postData;

    return axiosInstance.patch(`${postUrl}/${filter.id}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deletePost(postId: string): Promise<Post> {
    return axiosInstance.delete(`${postUrl}/${postId}`);
  },

  likePost(postId: string): Promise<Post> {
    return axiosInstance.patch(`${postUrl}/${postId}/like`, {});
  },

  retweetPost({ postId = '', text = '' }): Promise<Post> {
    return axiosInstance.post(`${postUrl}/${postId}/retweet`, { text });
  },

  deleteRetweetPost(postId: string): Promise<Post> {
    return axiosInstance.delete(`${postUrl}/${postId}/retweet`);
  },
};
