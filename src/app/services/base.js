import api from './api';

class BaseService {
  static fetchAll() {
    return api.get('/bases');
  }
}

export default BaseService;
