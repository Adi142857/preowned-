<template>
    <v-container class="profile" fluid style="background-color: #000000">
      <v-row
        align="center"
        class="text-center px-3"
        style="background-color: #131418; border-radius: 10px"
      >
        <v-col cols="12" md="6">
          <v-row align="center">
            <v-col cols="12" md="4">
              <v-avatar size="150" color="blue">
                <span class="white--text text-h2">{{ initials }}</span>
              </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
              <h1 class="white--text">
                {{
                  user.username.charAt(0).toUpperCase() + user.username.slice(1)
                }}
              </h1>
              <!-- email -->
              <h3 class="white--text">Email: {{ user.email }}</h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-col class="px-4 py-8">
        <v-row class="py-4">
          <h1 class="white--text text-h4 mx-sm-4 mx-md-6 mx-lg-10">
            Uploaded Books
          </h1>
        </v-row>
        <v-row>
          <v-container v-if="books.length > 0">
            <v-layout row wrap>
              <v-flex xs12 sm6 md4 lg3 v-for="book in books" :key="book.id">
                <BookCard
                :book="book"
                :inProfile="true"
                @refresh="getBooks"
                @editBook="editBook"
              />
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-else class="text-center">
            <h2 class="white--text">No books uploaded yet</h2>
          </v-container>
        </v-row>
      </v-col>
      <v-col class="px-4 py-8">
        <v-row class="py-4">
          <h1 class="white--text text-h4 mx-sm-4 mx-md-6 mx-lg-10">
            Uploaded Syllabus
          </h1>
        </v-row>
        <v-row>
          <v-container v-if="syllabuss.length > 0">
            <v-layout row wrap>
              <v-flex xs12 sm6 md4 lg3 v-for="item in syllabuss" :key="item.id">
                
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-else class="text-center">
            <h2 class="white--text">No Syllabus uploaded yet</h2>
          </v-container>
        </v-row>
      </v-col>
      <v-col class="px-4 py-8">
        <v-row class="py-4">
          <h1 class="white--text text-h4 mx-sm-4 mx-md-6 mx-lg-10">
            Uploaded Resources
          </h1>
        </v-row>
        <v-row v-if="resources.length > 0">
          <v-col v-for="item in resources" :key="item.id" cols="12" sm="6" md="4">
            <ResourceCard
            :resource="item"
            :inProfile="true"
            @refresh="getResources"
            @editResource="editResource"
          />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" class="text-center">
            <h2 class="white--text">No Resources Found</h2>
          </v-col>
        </v-row>
      </v-col>
      
    </v-container>
  </template>
  
  <script>
  import axiosInstance from '@/apiClient';
  export default {
    name: 'ProfileView',
    data() {
      return {
        initials: '',
        user: {
          username: '',
          email: '',
        },
        books: [],
        syllabuss: [],
        resources: [],
        isEdit: false,
        book: {},
        syllabus: {},
        resource: {},
      };
    },
    components: {
      BookCard: () => import('@/components/ProductCard.vue'),
      // AddBookForm: () => import('@/components/AddBookForm.vue'),
      // AddResForm: () => import('@/components/AddResForm.vue'),
      ResourceCard: () => import('@/components/RequirementsCard.vue'),
      // ResDetailsDialog: () => import('@/components/ReqDialog.vue'),
    },
    methods: {
      getUser() {
        axiosInstance.get('/auth/me').then((response) => {
          this.user = response.data.user;
          this.initials = this.user.username.charAt(0).toUpperCase();
        });
      },
      getBooks() {
        axiosInstance.get('/books/me').then((response) => {
          this.books = response.data;
        });
      },
      getSyllabus() {
        axiosInstance.get('/syllabus/me').then((response) => {
          this.syllabuss = response.data;
        });
      },
      getResources() {
        axiosInstance.get('/resources/me').then((response) => {
          this.resources = response.data;
        });
      },
      editBook(book) {
        this.book = book;
        this.$store.commit('setFormDialog', true);
        this.isEdit = true;
      },
      bookEditReq(payload) {
        axiosInstance
          .put(`/books/${this.book._id}`, payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.$store.commit('setFormDialog', false);
            this.isEdit = false;
            this.getBooks();
          })
          .catch((err) => {
            this.$store.commit('loading', false);
            console.log(err);
          });
      },
      editSyllabus(syllabus) {
        this.syllabus = syllabus;
        this.$store.commit('setSyllabusDialog', true);
        this.isEdit = true;
      },
      syllabusEditReq(payload) {
        axiosInstance
          .put(`/syllabus/${this.syllabus._id}`, payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.$store.commit('setSyllabusDialog', false);
            this.isEdit = false;
            this.$store.commit('flashSuccess', 'Syllabus Edited Successfully');
            this.getSyllabus();
          })
          .catch((err) => {
            this.$store.commit('loading', false);
            this.$store.commit('flashError', 'Something went wrong');
            console.log(err);
          });
      },
      editResource(resource) {
        this.resource = resource;
        this.$store.commit('setResDialog', true);
        this.isEdit = true;
      },
      resourceEditReq(payload) {
        axiosInstance
          .put(`/resources/${this.resource._id}`, payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.$store.commit('setResDialog', false);
            this.isEdit = false;
            this.$store.commit('flashSuccess', 'Resource Edited Successfully');
            this.getResources();
          })
          .catch((err) => {
            this.$store.commit('loading', false);
            this.$store.commit('flashError', 'Something went wrong');
            console.log(err);
          });
      },
    },
    created() {
      this.getUser();
      this.getBooks();
      this.getSyllabus();
      this.getResources();
    },
  };
  </script>
  
  <style scoped>
  .v-application .blue {
    background-color: #000044 !important;
    border-color: #000044 !important;
  }
  .profile {
    min-height: 100vh;
  }
  </style>