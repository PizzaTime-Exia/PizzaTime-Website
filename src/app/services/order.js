import api from './api';

class OrderService {
  static fetchAll() {
    return api.get(`/users/orders`);
  }

  static add(order) {
    return api.post('/orders', order);
  }

  static replace(id, order) {
    return api.put(`/orders/${id}`, order);
  }

  static remove(id) {
    return api.delete(`/orders/${id}`);
  }
}

export default OrderService;
