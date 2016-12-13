import _ from 'lazy.js';

let ID = 0;

class Order {
  constructor(user) {
    this.id = -1;
    this.items = [];
    this.delivred = false;
    this.paid = false;
    this.user = user;
  }

  get isEmpty() {
    return this.count === 0;
  }

  get count() {
    return this.items.length;
  }

  get price() {
    return _(this.items)
      .map(x => x.pizza.price)
      .sum()
      .toFixed(2);
  }

  add(pizza, base) {
    this.items.push({id: ++ID, pizza, base});
  }

  remove(id) {
    this.items = _(this.items).filter(x => x.id !== id).toArray();
  }

  clear() {
    this.items = [];
  }

  toApiFormat() {
    return {
      items: _(this.items).map(item => {
        return {pizzaId: item.pizza.id, baseId: item.base.id};
      }).toArray()
    };
  }
}

export default Order;
