<template>
    <div class="resources__container">
      <v-container style="margin-top: 100px">
        <v-row class="justify-space-between px-3">
          <h1 class="1A237E--text">Requirements</h1>
          <v-btn
            color="#fff"
            class="product__button"
            @click="() => $store.commit('setResDialog', true)"
            v-if="$store.state.isLoggedIn"
            >Add</v-btn>
        </v-row>
        <v-row v-if="requirements.length > 0">
          <v-col
            v-for="requirement in requirements"
            :key="requirement.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ResourceCard :requirement="requirement" />
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

            <h2 v-else class="black--text mx-20">No Requirements Found</h2>
          </v-col>
        </v-row>
      </v-container>
      <AddResForm v-if="$store.state.resDialog" @addRes="addRequirement" />
      <ReqDialog v-if="$store.state.resDetailsDialog" />

    </div>
  </template>
  
  <script>
  import axiosInstance from '@/api';
  import AddResForm from '@/components/AddRequirements.vue';
  import ResourceCard from '@/components/RequirementsCard.vue';
  import ReqDialog from '@/components/ReqDialog.vue';

  export default {
    name: 'ResourcesView',
    data() {
      return {
        requirements: [],
      };
    },
    methods: {
      getRequirements() {
        this.$store.commit('loading', true);
        axiosInstance
          .get('/requirements')
          .then((response) => {
            this.$store.commit('loading', false);
            this.requirements = response.data;
          })
          .catch((error) => {
            this.$store.commit('loading', false);
            console.log(error);
          });
      },
      addRequirement(payload) {
        axiosInstance
          .post('/requirements', payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.$store.commit('setResDialog', false);
            this.getRequirements();
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
      this.getRequirements();
    },
    components: { AddResForm, ResourceCard, ReqDialog },
  };
  </script>
  
  <style>
  .resources__container {
    min-height: 100vh;
    background-color: #fcfafb;
  }
  .product__button {
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