import api from './api';

class ConfigService {
  static getDates() {
    return api.get('/config/end_date');
  }
}

export default ConfigService;
