import axios from 'axios'

const commentUrl = '/api/comments'
export const commentApi = {
  getComments(filter: {}) {
    return axios.get(`${commentUrl}${filter}`)
  },

  getComment(commentId: string) {
    return axios.get(`${commentUrl}/${commentId}`)
  },

  createComment(comment: {}) {
    return axios.post(`${commentUrl}`, comment, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  updateComment(commentId: string, comment: {}) {
    return axios.post(`${commentUrl}/${commentId}`, comment, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  deleteComment(commentId: string) {
    return axios.delete(`${commentUrl}/${commentId}`)
  },
}
