<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div class="mx-2">{{date}}</div>
      <p class="text-h4 text--primary mx-2">
        {{requirement.title}}
      </p>
      <v-card-actions>
      <v-chip small color="blue" class="mx-1" v-for="tag in category" :key="tag">
        {{ tag }}
      </v-chip>
      </v-card-actions>
      <!-- <div class="text--primary">
        {{requirement.description}}
      </div> -->
    </v-card-text>
    <!-- <v-card-actions v-if="inProfile" class="justify-space-around">
        <v-btn color="blue" class="white--text" @click="$emit('editProduct', product)">Edit</v-btn>
        <v-btn color="red" @click="deleteProduct" class="white--text">Delete</v-btn>
        <v-btn color="green" class="white--text" @click="$router.push(`/chat/${product._id}`)">Chats</v-btn>
    </v-card-actions> -->
    <v-card-actions>
      <v-btn 
      color="green"
        class="white--text"
        rounded
        @click="reveal = true"
       
      >
         More
      </v-btn>
        <v-btn
        color="blue"
        class="white--text"
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

    <v-expand-transition>
      <v-card
       
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="">
          <p class="text-h4 text--primary">
              {{ requirement.title }}
          </p>
          <v-chip
          small
          color="blue"
          class="mr-3"
          v-for="tag in requirement.category"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
          <div class="text--primary">
            About : {{ requirement.description }}
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
          return this.requirement.category.slice(0, 4);
      },
      date() {
          const date = new Date(this.requirement.createdAt);
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          return `${month} ${year}`;
      },
  },
}
</script>