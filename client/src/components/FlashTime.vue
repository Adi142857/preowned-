<template>
    <v-snackbar
      :color="$store.state.flash.type"
      v-model="$store.state.flash.show"
      bottom
      right
      class="ma-sm-0 ma-md-2 ma-lg-6"
    >
      {{ $store.state.flash.message }}
    </v-snackbar>
  </template>
  <style scoped>

  </style>
  
  <script>
  export default {};
  </script>