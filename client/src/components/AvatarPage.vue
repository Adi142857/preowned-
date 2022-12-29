<template>
    <!-- profile avatar -->
    <v-menu bottom min-width="200px" rounded >
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="black" size="48">
            <span class="white--text text-h5">{{ initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="black">
              <span class="white--text text-h5">{{ initials }}</span>
            </v-avatar>
            <h3 class="mt-3">{{ user.username }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="$router.push('/profile')">
              Profile
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="logout"> Logout </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </template>
  <style>
  .v-application .black {
    background-color: #004 !important;
    border-color: #000000 !important;
  
  
  }
  </style>
  <script>
  import axiosInstance from '@/api';
  export default {
    data() {
      return {
        user: {
          username: '',
          email: '',
        },
        initials: '',
      };
    },
    methods: {
      getUser() {
        axiosInstance
          .get('/auth/me')
          .then((response) => {
            this.user = response.data.user;
            this.initials = this.user.username.charAt(0).toUpperCase();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/');
      },
    },
    mounted() {
      this.getUser();
    },
  };
  </script>