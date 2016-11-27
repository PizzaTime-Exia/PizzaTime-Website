import Auth from './auth.js';
import Axios from 'axios';

class PizzaService {
  static fetchAll() {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.get('/pizzas');
  }
}

export default PizzaService;
