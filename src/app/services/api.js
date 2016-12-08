import axios from 'axios';
import config from './../../config.json';

const api = axios.create({
  baseURL: config.api.url,
  timeout: 2000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'token': ''
  }
});

export default api;
