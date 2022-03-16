import axios from 'axios'

const chatUrl = '/api/chats'
export const chatApi = {
  getChats(filter: {}) {
    return axios.get(`${chatUrl}${filter}`)
  },

  getChat(chatId: string) {
    return axios.get(`${chatUrl}/${chatId}`)
  },

  createChat(chat: {}) {
    return axios.post(`${chatUrl}`, chat, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  updateChat(chatId: string, chat: {}) {
    return axios.post(`${chatUrl}/${chatId}`, chat, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  deleteChat(chatId: string) {
    return axios.delete(`${chatUrl}/${chatId}`)
  },
}
