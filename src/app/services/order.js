import Auth from './auth.js';
import Axios from 'axios';

class OrderService {
  static fetchAll() {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.get('/orders/' + Auth.user.id);
  }

  static add(order) {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.post('/orders/' + Auth.user.id), order;
  }

  static remove(order) {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.delete('/orders/' + Auth.user.id, order);
  }
}

export default OrderService;
