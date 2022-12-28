<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div class="mx-2">{{date}}</div>
      <p class="text-h4 text--primary mx-2">
        {{resource.title}}
      </p>
      <v-card-actions>
      <v-chip small color="blue" class="mx-1" v-for="tag in category" :key="tag">
        {{ tag }}
      </v-chip>
      </v-card-actions>
      <!-- <div class="text--primary">
        {{resource.description}}
      </div> -->
    </v-card-text>
    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        color="teal accent-4"
        @click="reveal = true"
        class="mx-2"
      >
        Learn More
      </v-btn>
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

    <v-expand-transition>
      <v-card
       
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="">
          <p class="text-h4 text--primary">
              {{ resource.title }}
          </p>
          <v-chip
          small
          color="blue"
          class="mr-3"
          v-for="tag in resource.category"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
          <div class="text--primary">
            About : {{ resource.description }}
          </div>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<style>
.v-card--reveal {
bottom: 0;
opacity: 1 !important;
position: absolute;
width: 100%;
}
</style>
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
data: () => ({
  reveal: false,
}),
methods:{
  openDetailDialog() {
      this.$store.commit('setResDetailsDialog', true);
      this.$store.commit('setResource', this.resource);
  },
  deleteResource() {
  axiosInstance
      .delete(`/resources/${this.resource._id}`)
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
}
</script>