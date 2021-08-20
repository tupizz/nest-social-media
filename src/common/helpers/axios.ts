import axios from 'axios';

export const codeFightApi = axios.create({
  baseURL: 'http://codefight.davidbanham.com',
});
