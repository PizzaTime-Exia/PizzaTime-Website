<template>
  <div class="ms-signin">
    <div class="signin-button">
      <button class="mui-btn mui-btn--large mui-btn--primary" v-on:click="connect()"><i class="fa fa-windows" aria-hidden="true"></i> Se connecter avec Viacesi</button>
    </div>
  </div>
</template>

<script>
import AuthService from './services/auth';

export default {
  name: 'MicrosoftSignIn',
  methods: {
    connect() {
      return AuthService.signin();
    }
  }
};
</script>
