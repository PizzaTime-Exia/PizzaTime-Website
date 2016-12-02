import Auth from './auth.js';
import axios from 'axios';

class BaseService {
  static fetchAll() {
    if (!Auth.isAuthentified) {
      return null;
    }
    return axios.get('/base');
  }
}

export default BaseService;
