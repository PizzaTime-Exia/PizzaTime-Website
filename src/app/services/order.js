import api from './api';

class OrderService {
  static fetchAll() {
    return api.get('/orders');
  }

  static add(order) {
    return api.post('/orders', order);
  }

  static remove(order) {
    return api.delete(`/orders/${order.id}`);
  }
}

export default OrderService;
