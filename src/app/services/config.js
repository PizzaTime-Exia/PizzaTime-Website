import api from './api';

class ConfigService {
  static maxOrderTime() {
    return api.get('/config/maxOrderTime');
  }
}

export default ConfigService;
