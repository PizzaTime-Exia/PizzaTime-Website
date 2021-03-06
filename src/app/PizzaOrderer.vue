<template>
  <div class="pizza-orderer">
    <div class="item-selector">
      <div id="pizza" class="mui-dropdown">
        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
          {{ selectedPizzaText }}
          <span class="mui-caret"></span>
        </button>
        <ul class="mui-dropdown__menu pizza-dropdown">
          <li v-for="pizza in pizzas">
            <a v-on:click="pizzaSelected(pizza.id)" href="#">
              <span class="pizza-title"><strong>{{ pizza.name }}</strong> {{ pizza.price }}€</span>
              <br>
              <span class="pizza-description">{{ pizza.description }}</span>
            </a>
          </li>
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
      <table class="mui-table mui-table--bordered items-table">
        <tbody>
          <tr v-if="!!order" v-for="item in order.items">
            <td><strong>{{ item.pizza.name }}</strong></td>
            <td>{{ item.base.name }}</td>
            <td>{{ item.pizza.price }}€</td>
            <td align="right"><button class="mui-btn mui-btn--small mui-btn--danger" v-on:click="deleteOrderItem(item.id)">X</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="order-confirm">
      <div class="order-button">
        <button class="add-item mui-btn mui-btn--primary" v-on:click="validateOrder()" :disabled="isOrderLocked">{{ orderText }} | {{ order.price }}€</span></button>
      </div>
      <div class="order-button" v-if="canCancelOrder">
        <button class="add-item mui-btn mui-btn--danger" v-on:click="cancelOrder()" :disabled="isOrderLocked">Annuler ma commande</button>
      </div>
      <div class="order-details">
        <span class="error-message">{{ errorMessage }}</span>
      </div>
    </div>
    <countdown-component :delivery-date="deliveryDate" :max-order-date="maxOrderDate"></countdown-component>
  </div>
</template>

<script>
import _ from 'lazy.js';
import moment from 'moment';
import AuthService from './services/auth';
import OrderService from './services/order';
import PizzaService from './services/pizza';
import BaseService from './services/base';
import ConfigService from './services/config';
import Order from './Order';
import Countdown from './Countdown.vue';

moment.locale('fr');

export default {
  name: 'PizzaOrderer',
  components: {
    'countdown-component': Countdown,
  },
  data() {
    return {
      pizzas: [],
      bases: [],
      selected: {
        pizza: null,
        base: null
      },
      order: new Order(),
      maxOrderDate: new Date(),
      deliveryDate: new Date()
    }
  },
  computed: {
    orderText() {
      return this.canCancelOrder ? 'Modifier ma commande' : 'Commander';
    },
    canCancelOrder() {
      return this.order.id >= 0 && !this.isOderLocked;
    },
    isOrderLocked() {
      return this.order.paid || this.order.delivered || this.areOrderLocked;
    },
    errorMessage() {
      if (this.order.paid) {
        return 'Vous avez déjà payé pour cette commande, impossible de la modifier.';
      } else if (this.order.delivered) {
        return 'Cette commande vous à déjà été livrée, impossible de la modifier.';
      }
    },
    selectedPizzaText() {
      return this.selected.pizza ? this.selected.pizza.name :  'Choisissez une pizza';
    },
    selectedBaseText() {
      return this.selected.base ? this.selected.base.name : 'Choisissez une base';
    },
    areOrderLocked() {
      return moment(this.maxOrderDate).isBefore(moment());
    }
  },
  methods: {
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
        alert('Vous n\'avez pas sélectionné de pizza.');
      } else if (!Boolean(this.selected.base)) {
        alert('Vous n\'avez pas sélectionné de base.');
      }
    },
    deleteOrderItem(itemId) {
      this.order.remove(itemId);
    },
    validateOrder() {
      if (this.areOrderLocked) {
        alert('Les commandes sont fermées pour cette semaine.');
        return;
      }
      if (this.isOrderLocked) {
        alert('Votre commande ayant été payée ou livrée, vous ne pouvez pas la modifier.');
        return;
      }
      if (this.order.isEmpty) {
        alert('Vous n\'avez rien commandé.');
        return;
      }
      if (this.order.paid) {
        alert('Vous avez déjà payé pour cette commande, impossible de la modifier.');
        return;
      }
      if (this.order.delivered) {
        alert('Cette commande vous à déjà été livrée, impossible de la modifier.');
        return;
      }
      if (this.order.id < 0) {
        OrderService
          .add(this.order.toApiFormat())
          .then(x => this.loadOrder())
          .catch(x => {
            if (x.response.status === 419) {
              AuthService.signin();
            }
          });
        alert(`${this.order.count} pizzas commandées.`);
      } else {
        OrderService
          .replace(this.order.id, this.order.toApiFormat())
          .then(x => this.loadOrder())
          .catch(x => {
            if (x.response.status === 419) {
              AuthService.signin();
            }
          });
        alert(`${this.order.count} pizzas commandées.\nPensez à payer en salle 24 avant la fermeture des commandes.`);
      }
    },
    cancelOrder() {
      if (this.order.id >= 0) {
        OrderService
          .remove(this.order.id)
          .then(x => {
            this.order = new Order();
            alert('Commande annulée.');
          })
          .catch(x => {
            if (x.response.status === 419) {
              AuthService.signin();
            }
          });
      }
    },
    loadOrder() {
      OrderService
        .fetchAll()
        .then(response => {
          this.order = new Order();
          if (response.data.id >= 0) {
            this.order.id = response.data.id;
            this.order.delivered = response.data.delivered;
            this.order.paid = response.data.paid;
            response.data.items.forEach(item => {
              let pizza = _(this.pizzas).find(x => x.id === item.pizzaId);
              let base = _(this.bases).find(x => x.id === item.baseId);
              this.order.add(pizza, base);
            });
          }
        })
        .catch(x => {
          if (x.response.status === 419) {
            AuthService.signin();
          }
        });
    }
  },
  created() {
    ConfigService
      .getDates()
      .then(response => {
        this.maxOrderDate = new Date(response.data.maxOrderDate);
        this.deliveryDate = new Date(response.data.deliveryDate);
        return BaseService.fetchAll();
      })
      .then(response => {
        this.bases = response.data;
        return PizzaService.fetchAll();
      })
      .then(response => {
        this.pizzas = response.data;
        this.loadOrder();
      })
      .catch(x => {
        if (x.response.status === 419) {
          AuthService.signin();
        }
      });;
  }
};
</script>
