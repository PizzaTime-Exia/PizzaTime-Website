import Auth from './auth.js';
import Axios from 'axios';

class ConfigService {
  static maxOrderTime() {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.get('/config/maxOrderTime');
  }
}

export default ConfigService;
