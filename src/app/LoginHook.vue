<template>
  <div>
    <p>Vous etes connecté en tant que {{ $route.params.name }}</p>
    <p>Redirection...</p>
  </div>
</template>

<script>
import cookies from 'browser-cookies';

export default {
  name: 'LoginHook',
  created() {
    cookies.set('username', this.$route.params.name);
    cookies.set('token', this.$route.params.token);
    window.location.replace('http://pizzatime.ovh/');
  }
};
</script>
