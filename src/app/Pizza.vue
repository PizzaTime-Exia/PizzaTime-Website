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
import cookies from 'browser-cookies';
import qs from 'query-string';
import Header from './Header.vue';
import PizzaOrderer from './PizzaOrderer.vue';
import MicrosoftSignIn from './MicrosoftSignIn.vue';
import Footer from './Footer.vue';
import AuthService from './services/auth';
import api from './services/api';

export default {
  name: 'Pizza',
  components: {
    'header-component': Header,
    'pizza-orderer-component': PizzaOrderer,
    'ms-signin-component': MicrosoftSignIn,
    'footer-component': Footer
  },
  created() {
    AuthService.load();
    const args = qs.parse(window.location.search);
    if (args.name && args.token) {
      AuthService.connect(args.name, args.token);
    }
  },
  computed: {
    isAuthentified() {
      return AuthService.isAuthentified;
    }
  }
};
</script>
