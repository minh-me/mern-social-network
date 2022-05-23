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

  getPost(postId: string): Promise<Post> {
    return axiosInstance.get(`${postUrl}/${postId}`);
  },

  createPost(post: {}): Promise<Post> {
    return axiosInstance.post(`${postUrl}`, post, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updatePost(postId: string, post: {}): Promise<Post> {
    return axios.post(`${postUrl}/${postId}`, post);
  },

  deletePost(postId: string): Promise<Post> {
    return axios.delete(`${postUrl}/${postId}`);
  },

  likePost(postId: string): Promise<Post> {
    return axiosInstance.patch(`${postUrl}/${postId}/like`, {});
  },
};
