import axios from 'axios';

const client = axios;

client.defaults.baseURL = 'http://localhost:8888';

client.interceptors.response.use((res) => {
  return res.data;
});

export { client };
