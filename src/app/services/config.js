import api from './api';

class ConfigService {
  static orderDay() {
    return api.get('/config/end_date');
  }
}

export default ConfigService;
