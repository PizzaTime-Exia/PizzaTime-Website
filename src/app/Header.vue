<template>
  <header>
    <div class="mui-appbar header">
      <div class="tooltip bug-reporter" v-on:click="reportBug()">
        <span>Alpha</span>&nbsp;<i class="fa fa-bug" aria-hidden="true"></i>
        <span class="tooltiptext">Rapporter un bug</span>
      </div>
      <div class="header-title">
        <a href="/">Pizza Time</a>
      </div>
      <td v-if="isAuthentified" class="mui--appbar-height user-bar" align="right">
        <div class="mui-dropdown">
          <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
            {{ username }}
            <span class="mui-caret"></span>
          </button>
          <ul class="mui-dropdown__menu mui-dropdown__menu--right">
            <li v-on:click="disconnect()"><a href="#">Déconnexion</a></li>
          </ul>
        </div>
      </td>
    </div>
  </header>
</template>

<script>
import AuthService from './services/auth.js';

export default {
  name: 'Header',
  computed: {
    isAuthentified() {
      return AuthService.isAuthentified;
    },
    username() {
      return AuthService.username;
    }
  },
  methods: {
    disconnect() {
      AuthService.disconnect();
    },
    reportBug() {
      window.location.href = `mailto:pizzatime@viacesi.fr?subject=Bug Report`;
    }
  }
};
</script>
