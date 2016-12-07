import api from './api';

class BaseService {
  static fetchAll() {
    return api.get('/base');
  }
}

export default BaseService;
