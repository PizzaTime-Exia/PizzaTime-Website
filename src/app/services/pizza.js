import api from './api';

class PizzaService {
  static fetchAll() {
    return api.get('/pizzas');
  }
}

export default PizzaService;
