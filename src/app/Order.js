import _ from 'lazy.js';

let ID = 0;

class Order {
  constructor(items) {
    this.items = items || [];
    this.delivred = false;
    this.paid = false;
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
      .sum();
  }

  add(pizza, base) {
    this.items.push({id: ++ID, pizza, base});
  }

  remove(id) {
    this.items = _(this.items).filter(x => x.id !== id).toArray();
  }

  toApiFormatedArray() {
    return {
      items: _(this.items).map(item => {
        return {id: item.pizza.id, base: {id: item.base.id}};
      })
    };
  }
}

export default Order;
