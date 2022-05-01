import axios from 'axios';
import { Post, PostsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const postUrl = '/api/posts';
export const postApi = {
  getPosts({ queryKey = ['posts?page=1&limit=1'] }): Promise<PostsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getPostsByPostedBy({ queryKey = ['posts?page=1&limit=1'] }): Promise<PostsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getPost(postId: string) {
    return axios.get(`${postUrl}/${postId}`);
  },

  createPost(post: {}) {
    return axiosInstance.post(`${postUrl}`, post, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updatePost(postId: string, post: {}) {
    return axios.post(`${postUrl}/${postId}`, post);
  },

  deletePost(postId: string) {
    return axios.delete(`${postUrl}/${postId}`);
  },

  likePost(postId: string): Promise<Post> {
    return axiosInstance.patch(`${postUrl}/${postId}/like`, {});
  },
};
