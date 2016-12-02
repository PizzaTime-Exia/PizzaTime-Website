import Auth from './auth.js';
import axios from 'axios';

class PizzaService {
  static fetchAll() {
    if (!Auth.isAuthentified) {
      return null;
    }
    return axios.get('/pizza');
  }
}

export default PizzaService;
