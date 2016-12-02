import Auth from './auth.js';
import Axios from 'axios';

class OrderService {
  static fetchAll() {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.get('/orders');
  }

  static add(order) {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.post('/orders', order);
  }

  static remove(order) {
    if (!Auth.isAuthentified) {
      return null;
    }
    return Axios.delete('/orders/' + order.id);
  }
}

export default OrderService;
