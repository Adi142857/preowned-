<template>
    <v-dialog v-model="$store.state.resDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add your requirement</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="Title"
              v-model="title"
              outlined
              dense
              prepend-inner-icon="mdi-shopping"
              :rules="rules"
            />
            <v-text-field
              label="Short description about your requirement"
              v-model="description"
              outlined
              dense
              prepend-inner-icon="mdi-details"
              :rules="rules"
            />
            <v-combobox
              v-model="category"
              chips
              clearable
              multiple
              outlined
              dense
              label="Category"
              prepend-inner-icon="mdi-tag"
            >
              <template v-slot:selection="{ attrs, category, select, selected }">
                <v-chip
                  small
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(category)"
                >
                  {{ category }}
                </v-chip>
              </template>
            </v-combobox>
            <v-text-field
              label="Phone number/email/Instagram/Whatsapp"
              v-model="links"
              prepend-inner-icon="mdi-cellphone"
              outlined
              dense
              placeholder="Add links seperated by commas"
              :rules="rules"
            />
           
            
            <v-col class="text-right">
              <v-btn color="white" @click="$store.commit('setResDialog', false)"
                >Cancel</v-btn
              >
              <v-btn color="blue" @click="submit" class="ml-3">
                <v-progress-circular
                  v-if="$store.state.loading"
                  indeterminate
                  size="20"
                  color="white"
                ></v-progress-circular>
                <span v-else>Add</span>
              </v-btn>
            </v-col>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axiosInstance from '@/api';
  export default {
    data() {
      return {
        title: '',
        category: [],
        links: '',
        author: '',
        description: '',
        user: {
          username: '',
        },
        rules: [(v) => !!v || 'This field is required'],
      };
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false,
      },
      requirement: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.$store.commit('loading', true);
          const linksArray = this.links.split(',');
          const toEdit = {
            title: this.title,
            description: this.description,
            category: this.category,
            author: this.user.username.charAt(0).toUpperCase() + this.user.username.slice(1),
            links: linksArray,
          };
          if (this.isEdit) this.$emit('edit', toEdit);
          else this.$emit('addRes', toEdit);
        }
      },
      getUser() {
        axiosInstance.get('/auth/me').then((response) => {
          this.user = response.data.user;
          this.initials = this.user.username.charAt(0).toUpperCase();
        });
      },
    },
    watch: {
      isEdit: {
        handler() {
          if (this.isEdit) {
            this.title = this.requirement.title;
            this.description = this.requirement.description;
            this.category = this.requirement.category;
            this.links = this.requirement.links.join(',');
          }
        },
        immediate: true,
      },
    },
    created() {
      this.getUser();
    },
  };
  </script>