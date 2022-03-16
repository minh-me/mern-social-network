import axios from 'axios'

const postUrl = '/api/posts'
export const postApi = {
  getPosts(filter: {}) {
    return axios.get(`${postUrl}${filter}`)
  },

  getPost(postId: string) {
    return axios.get(`${postUrl}/${postId}`)
  },

  createPost(post: {}) {
    return axios.post(`${postUrl}`, post, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  updatePost(postId: string, post: {}) {
    return axios.post(`${postUrl}/${postId}`, post, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  deletePost(postId: string) {
    return axios.delete(`${postUrl}/${postId}`)
  },
}
