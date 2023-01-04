<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <!-- <div>Word of the Day</div> -->
      <h3 class="req-title ml-3">
        {{requirement.title}}
      </h3>
       <v-card-actions>
        <v-chip small color="blue" text-white class="mx-1" v-for="tag in category" :key="tag">
          {{ tag }}
        </v-chip>
      </v-card-actions>
      <div class="text--primary ml-2 mt-2">
        <b>Requirement</b> - {{requirement.description}}
      </div>
      <div class="text--primary ml-2 mt-2" v-for="link in requirement.links" :key="link">
        <b>Phone no</b> - {{ link }}
      </div>
     
      <div class="v-card-subtitle class ml-2 mt-3">
        Posted by <b>{{requirement.author}}</b> at {{date}}
      </div>
      
    </v-card-text>

    <v-card-actions>
      
        <v-btn
        color="blue"
        class="white--text ml-3"
        rounded
        @click="$emit('editRequirement', requirement)"
        v-if="inProfile"
      >
        Edit
      </v-btn>
      <v-btn
        color="red"
        class="white--text"
        rounded
        @click="deleteRequirement"
        v-if="inProfile"
      >
        Delete
      
      </v-btn>
    </v-card-actions>

  </v-card>
</template>
<style>

</style>
<script>
import axiosInstance from '@/api';

export default {
props: {
  requirement: {
    type: Object,
    required: true,
  },
  inProfile: {
    type: Boolean,
    default: false,
  },
},
data: () => ({
  initials: '',
  reveal: false,
}),
methods:{
  
  openDetailDialog() {
      this.$store.commit('setResDetailsDialog', true);
      this.$store.commit('setRequirement', this.requirement);
  },
  deleteRequirement() {
  axiosInstance
      .delete(`/requirements/${this.requirement._id}`)
      .then(() => {
      this.$emit('refresh');
      this.$store.commit('flashSuccess', 'Requirement Deleted Successfully');
      })
      .catch((err) => {
      console.log(err);
      this.$store.commit('flashError', 'Something went wrong');
      });
  },
},
  computed: {
      category() {
          return this.requirement.category.slice(0, 4);
      },
      date() {
          const date = new Date(this.requirement.createdAt);
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          const day = date.getDate();
          return `${day} ${month} ${year}`;
      },
  },
}
</script>