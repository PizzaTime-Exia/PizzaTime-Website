<template>
  <div id="root">
    <header-component></header-component>
    <main class="content">
      <pizza-orderer-component v-if="isAuthentified"></pizza-orderer-component>
      <ms-signin-component v-if="!isAuthentified"></ms-signin-component>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import PizzaOrderer from './PizzaOrderer.vue';
import MicrosoftSignIn from './MicrosoftSignIn.vue';
import Footer from './Footer.vue';
import AuthService from './services/auth.js';

export default {
  name: 'Pizza',
  components: {
    'header-component': Header,
    'pizza-orderer-component': PizzaOrderer,
    'ms-signin-component': MicrosoftSignIn,
    'footer-component': Footer
  },
  computed: {
    isAuthentified() {
      return AuthService.isAuthentified;
    }
  }
};
</script>
