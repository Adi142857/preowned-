<template>
  <div id="app">
    <v-app>
      <Navbar />
      <router-view />
    </v-app>
  </div>
</template>

<script>

import NavBarVue from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Navbar: NavBarVue,

},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
