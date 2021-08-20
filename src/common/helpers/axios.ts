import axios from 'axios';
import axiosRetry from 'axios-retry';

export const codeFightApi = axios.create({
  baseURL: 'http://codefight.davidbanham.com',
});

axiosRetry(codeFightApi, {
  retries: 3,
  retryDelay() {
    return 200;
  },
});
