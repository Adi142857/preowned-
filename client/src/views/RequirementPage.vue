<template>
    <div class="resources__container">
      <v-container style="margin-top: 100px">
        <v-row class="justify-space-between px-3">
          <h1 class="1A237E--text">Requirements</h1>
          <v-btn
            color="#fff"
            class="book__button"
            @click="() => $store.commit('setResDialog', true)"
            v-if="$store.state.isLoggedIn"
            >Add</v-btn>
        </v-row>
        <v-row v-if="resources.length > 0">
          <v-col
            v-for="resource in resources"
            :key="resource.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ResourceCard :resource="resource" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" class="text-center">
            <!-- add a progress view -->
            <v-progress-circular
              indeterminate
              color="blue"
              class="mt-5"
              v-if="$store.state.loading"
            ></v-progress-circular>

            <h2 v-else class="white--text">No Resources Found</h2>
          </v-col>
        </v-row>
      </v-container>
      <AddResForm v-if="$store.state.resDialog" @addRes="addResource" />
      <ReqDialog v-if="$store.state.resDetailsDialog" />

    </div>
  </template>
  
  <script>
  import axiosInstance from '@/apiClient';
  import AddResForm from '@/components/AddRequirements.vue';
  import ResourceCard from '@/components/RequirementsCard.vue';
  import ReqDialog from '@/components/ReqDialog.vue';

  export default {
    name: 'ResourcesView',
    data() {
      return {
        resources: [],
      };
    },
    methods: {
      getResources() {
        this.$store.commit('loading', true);
        axiosInstance
          .get('/resources')
          .then((response) => {
            this.$store.commit('loading', false);
            this.resources = response.data;
          })
          .catch((error) => {
            this.$store.commit('loading', false);
            console.log(error);
          });
      },
      addResource(payload) {
        axiosInstance
          .post('/resources', payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.$store.commit('setResDialog', false);
            this.getResources();
            this.$store.commit('flashSuccess', 'Syllabus Added Successfully');
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit('loading', false);
            this.$store.commit('flashError', 'Something went wrong');
          });
      },
    },
    mounted() {
      this.getResources();
    },
    components: { AddResForm, ResourceCard, ReqDialog },
  };
  </script>
  
  <style>
  .resources__container {
    min-height: 100vh;
    background-color: #fcfafb;
  }
  .book__button {
    background-color: blue;
    color: #131418;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  </style>