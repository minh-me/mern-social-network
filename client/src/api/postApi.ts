import axios from 'axios';
import { PostsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const postUrl = '/api/posts';
export const postApi = {
  getPosts({ pageParam = 1 }): Promise<PostsResponse> {
    console.log({ pageParam });
    return axiosInstance.get(`${postUrl}?page=${pageParam}&limit=1`);
  },

  getPost(postId: string) {
    return axios.get(`${postUrl}/${postId}`);
  },

  createPost(post: {}) {
    return axios.post(`${postUrl}`, post, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updatePost(postId: string, post: {}) {
    return axios.post(`${postUrl}/${postId}`, post, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deletePost(postId: string) {
    return axios.delete(`${postUrl}/${postId}`);
  },
};
