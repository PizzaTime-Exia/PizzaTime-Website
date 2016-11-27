<template>
  <div class="pizza-orderer">
    <div class="item-selector">
      <div id="pizza" class="mui-dropdown">
        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
          Choisissez une pizza
          <span class="mui-caret"></span>
        </button>
        <ul class="mui-dropdown__menu">
          <li v-for="pizza in pizzas"><a v-on:click="pizzaSelected(pizza.id)" href="#">{{ pizza.name }}</a></li>
        </ul>
      </div>
      <div id="base" class="mui-dropdown">
        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
          Choisissez une base
          <span class="mui-caret"></span>
        </button>
        <ul class="mui-dropdown__menu">
          <li v-for="base in bases"><a v-on:click="baseSelected(base.id)" href="#">{{ base.name }}</a></li>
        </ul>
      </div>
      <button class="add-item mui-btn mui-btn--primary" v-on:click="addOrderItem">+</button>
    </div>
    <div class="item-list">
      <table class="mui-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Base</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!!order" v-for="item in order.items">
            <td>{{ item.pizza.name }}</td>
            <td>{{ item.base }}</td>
            <td>{{ item.pizza.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="order-confirm">
      <div class="order-button">
        <button class="add-item mui-btn mui-btn--primary">Commander</button>
      </div>
      <div class="order-details">
        <span> {{ orderCount }} pizzas for a total of {{ orderPrice }}€.</span>
      </div>
    </div>
  </div>
</template>

<script>
import PizzaService from './services/pizza.js';
//import AuthService from './serivces/auth.js';

export default {
  name: 'PizzaOrderer',
  data() {
    return {
      pizzas: [],
      bases: [],
      selectedPizza: null,
      selectedbase: null
    }
  },
  beforeRouteEnter (to, from, next) {
    /*if (!Auth.isAuthentified) {
      router.push({ path: 'signin' })
    }*/
  },
  created() {
    PizzaService
      .fetchAll()
      .then(response => {
        this.techs = response.json();
      });
  }
};
</script>
