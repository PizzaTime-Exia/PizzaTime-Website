<template>
  <div class="pizza-orderer">
    <div class="item-selector">
      <div id="pizza" class="mui-dropdown">
        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
          {{ selectedPizzaText }}
          <span class="mui-caret"></span>
        </button>
        <ul class="mui-dropdown__menu">
          <li v-for="pizza in pizzas"><a v-on:click="pizzaSelected(pizza.id)" href="#">{{ pizza.name }} ({{ pizza.price }}€)</a></li>
        </ul>
      </div>
      <div id="base" class="mui-dropdown">
        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
          {{ selectedBaseText }}
          <span class="mui-caret"></span>
        </button>
        <ul class="mui-dropdown__menu">
          <li v-for="base in bases"><a v-on:click="baseSelected(base.id)" href="#">{{ base.name }}</a></li>
        </ul>
      </div>
      <button class="mui-btn mui-btn--primary" v-on:click="addOrderItem()">+</button>
    </div>
    <div class="item-list">
      <table class="mui-table mui-table--bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Base</th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!!order" v-for="item in order.items">
            <td>{{ item.pizza.name }}</td>
            <td>{{ item.base.name }}</td>
            <td>{{ item.pizza.price }}</td>
            <td><button class="mui-btn mui-btn--small mui-btn--danger" v-on:click="deleteOrderItem(item.id)">X</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="order-confirm">
      <div class="order-button">
        <button class="add-item mui-btn mui-btn--primary">Commander <span v-bind:class="{ 'date-warning': isDateAmbiguous }">({{ nextFriday }})</span></button>
      </div>
      <div class="order-details">
        <span> {{ order.count }} pizzas pour un total de {{ order.price }}€.</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lazy.js';
import PizzaService from './services/pizza.js';
import BaseService from './services/base.js';
import ConfigService from './services/config.js';
import Order from './Order.js';

export default {
  name: 'PizzaOrderer',
  data() {
    return {
      config: {
        maxOrderTime: {
          hours: 10,
          minutes: 0
        }
      },
      pizzas: [],
      bases: [],
      selected: {
        pizza: null,
        base: null
      },
      order: new Order()
    }
  },
  computed: {
    selectedPizzaText() {
      return this.selected.pizza ? this.selected.pizza.name :  'Choisissez une pizza';
    },
    selectedBaseText() {
      return this.selected.base ? this.selected.base.name : 'Choisissez une base';
    },
    nextFriday() {
      return this.formatDate(this.getNextFriday());
    },
    isDateAmbiguous() {
      let today = new Date();
      let friday = this.getNextFriday();
      today.setHours(0,0,0,0);
      friday.setHours(0,0,0,0);
      return (today.getTime() === friday.getTime());
    }
  },
  methods: {
    formatDate(date) {
      return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    },
    getNextFriday() {
      let today = new Date();
      let maxOrderTime = this.config.maxOrderTime;
      let dayOfToday = today.getDay();

      if (dayOfToday === 5 && (today.getHours() < maxOrderTime.hours
        || today.getHours() === maxOrderTime.hours && today.getMinutes() < maxOrderTime.minutes)) {
        return this.formatDate(today);
      }

      return new Date(today.setDate(today.getDate() + (7 + 5 - today.getDay()) % 7));
    },
    pizzaSelected(pizzaId) {
      this.selected.pizza = _(this.pizzas).find(x => x.id === pizzaId);
      this.selected.base = this.selected.pizza.base;
    },
    baseSelected(baseId) {
      this.selected.base = _(this.bases).find(x => x.id === baseId);
    },
    addOrderItem() {
      if (Boolean(this.selected.pizza) && Boolean(this.selected.base)) {
        this.order.add(this.selected.pizza, this.selected.base);
      } else if (!Boolean(this.selected.pizza)) {
        console.log('Error: no pizza selected', this.selected.pizza);
      } else if (!Boolean(this.selected.base)) {
        console.log('Error: no base selected', this.selected.base);
      }
    },
    deleteOrderItem(itemId) {
      console.log(this.order.items);
      this.order.remove(itemId);
      console.log(this.order.items);
    }
  },
  created() {
    PizzaService
      .fetchAll()
      .then(response => {
        this.pizzas = response.data;
      });

    BaseService
      .fetchAll()
      .then(response => {
        this.bases = response.data;
      });
  }
};
</script>
