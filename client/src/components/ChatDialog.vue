<template>
    <v-dialog
      v-model="$store.state.chat.chatDialog"
      max-width="600px"
      @click:outside="
        () => {
          $store.commit('setChatDialog', false);
          $store.commit('clearChat');
        }
      "
    >
      <v-card dark>
        <v-card-title class="headline">
          <v-icon class="mr-2" color="white">mdi-forum</v-icon>
          Chat
          <v-spacer />
          <v-btn
            icon
            @click="
              () => {
                $store.commit('setChatDialog', false);
                $store.commit('clearChat');
              }
            "
          >
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-list v-if="chat.messages.length" class="chat__card">
            <v-list-item
              v-for="message in chat.messages"
              :key="message._id"
              v-bind:class="
                message.by._id === $store.state.auth.userId
                  ? 'px-2 justify-end'
                  : 'px-2'
              "
            >
              <v-card class="ma-1 pa-2" color="grey darken-3" dark>
                <v-row v-if="message.by._id === $store.state.auth.userId">
                  <v-list-item-content class="text-right ml-2">
                    <v-list-item-subtitle>
                      {{ message.by.username }}
                    </v-list-item-subtitle>
                    <v-list-item-title class="text-wrap">
                      {{ message.message }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar class="mr-3">
                    <v-avatar color="#004">
                      <span class="white--text">
                        {{ getInitials(message.by.username) }}
                      </span>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-row>
                <v-row v-if="message.by._id !== $store.state.auth.userId">
                  <v-list-item-avatar class="ml-3">
                    <v-avatar color="#034">
                      <span class="white--text">
                        {{ getInitials(message.by.username) }}
                      </span>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content class="mr-4">
                    <v-list-item-subtitle>
                      {{ message.by.username }}
                    </v-list-item-subtitle>
                    <v-list-item-title class="text-wrap">
                      {{ message.message }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-row>
              </v-card>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item class="px-0 text-center justify-center">
              <v-progress-circular
                indeterminate
                color="red"
                v-if="$store.state.loading"
              ></v-progress-circular>
              <v-list-item-content v-else class="mr-4">
                <v-list-item-title> No messages yet. </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-text-field
            v-model="message"
            placeholder="Type your message here"
            small
            outlined
            hide-details="auto"
            @keyup.enter="sendMessage"
          ></v-text-field>
          <v-btn icon @click="sendMessage" class="ml-2" :disabled="disableSend">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
      };
    },
    methods: {
      getInitials(name) {
        return name.charAt(0).toUpperCase();
      },
      sendMessage() {
        this.$store.dispatch('sendMessage', {
          message: this.message,
          chatId: this.chat._id,
        });
        this.message = '';
      },
    },
    computed: {
      chat() {
        return this.$store.state.chat.chat;
      },
      disableSend() {
        return this.message.trim() === '';
      },
    },
  };
  </script>
  
  <style scoped>
  .chat__card {
    height: 500px;
    overflow: auto;
  }
  ::-webkit-scrollbar {
    width: 0.2rem;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: black;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(212, 212, 212);
  }
  /* reponsive height */
  @media screen and (max-height: 600px) {
    #chat-card {
      height: 300px;
    }
  }
  </style>