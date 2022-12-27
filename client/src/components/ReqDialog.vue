<template>
    <v-dialog
      v-model="$store.state.resDetailsDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card dark>
        <v-toolbar dark color="red">
          <v-btn icon dark @click="$store.commit('setResDetailsDialog', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Resource</v-toolbar-title>
        </v-toolbar>
        <v-card-title class="text-h4">
          {{ $store.state.resource.title }}
        </v-card-title>
        <v-card-text>
          <!-- category chips -->
          <v-chip
            small
            color="red"
            class="mr-3"
            v-for="tag in $store.state.resource.category"
            :key="tag"
          >
            {{ tag }}
          </v-chip>
        </v-card-text>
        <v-card-subtitle class="text-h6">
          <span class="text-h6 white--text"> About: </span>
          <span class="text-subtitle-5 white--text">
            {{ $store.state.resource.description }}
          </span>
        </v-card-subtitle>
  
        <!-- links  in a list with a link icon at left-->
        <v-list>
          <v-list-item
            v-for="link in $store.state.resource.links"
            :key="link"
            class="px-5"
          >
            <v-card class="my-3 pa-3" width="100%" color="#666666" elevation="4">
              <v-row align-content="center" class="justify-center">
                <v-list-item-icon class="mx-3">
                  <v-icon>mdi-link</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="mx-3">
                  <v-list-item-title
                    @click="openLink(link)"
                    style="cursor: pointer"
                  >
                    {{ link }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-row>
            </v-card>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    methods: {
      openLink(url) {
        if (!url.match(/^https?:\/\//i)) {
          url = 'http://' + url;
        }
        window.open(url, '_blank');
      },
    },
  };
  </script>