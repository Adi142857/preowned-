<template>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">{{ date }}</div>
          <v-list-item-title class="text-h5 mb-1">{{
            resource.title
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ resource.description }}</v-list-item-subtitle>
        </v-list-item-content>
  
        <v-list-item-avatar tile size="80">
          <v-icon size="100" color="red">mdi-file-document</v-icon>
        </v-list-item-avatar>
      </v-list-item>
      <!-- chips of category -->
      <v-card-actions>
        <v-chip small color="red" class="mx-2" v-for="tag in category" :key="tag">
          {{ tag }}
        </v-chip>
      </v-card-actions>
  
      <v-card-actions class="mx-2">
        <v-btn outlined rounded text @click="openDetailDialog"> View </v-btn>
        <!-- edit delete if isProfile-->
        <v-btn
          outlined
          rounded
          text
          @click="$emit('editResource', resource)"
          color="primary"
          v-if="inProfile"
        >
          Edit
        </v-btn>
        <v-btn
          outlined
          rounded
          text
          @click="deleteResource"
          color="error"
          v-if="inProfile"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  import axiosInstance from '@/apiClient';
  export default {
    props: {
      resource: {
        type: Object,
        required: true,
      },
      inProfile: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      openDetailDialog() {
        this.$store.commit('setResDetailsDialog', true);
        this.$store.commit('setResource', this.resource);
      },
      deleteResource() {
        axiosInstance
          .delete(`/resources/${this.resource.id}`)
          .then(() => {
            this.$emit('refresh');
            this.$store.commit('flashSuccess', 'Syllabus Deleted Successfully');
          })
          .catch((err) => {
            console.log(err);
            this.$store.commit('flashError', 'Something went wrong');
          });
      },
    },
    computed: {
      category() {
        return this.resource.category.slice(0, 4);
      },
      date() {
        const date = new Date(this.resource.createdAt);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${month} ${year}`;
      },
    },
  };
  </script>