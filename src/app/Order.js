import _ from 'lazy.js';

let ID = 0;

class Order {
  constructor(items) {
    this.items = items || [];
  }

  get count() {
    return this.items.length;
  }

  get price() {
    return _(this.items)
      .map(x => x.pizza.price)
      .sum();
  }

  add(pizza, base) {
    this.items.push({id: ++ID, pizza, base});
  }

  remove(id) {
    this.items = _(this.items).filter(x => x.id !== id).toArray();
  }
}

export default Order;
