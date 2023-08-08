<template>
  <v-app>
    <router-link to="/login"></router-link>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>