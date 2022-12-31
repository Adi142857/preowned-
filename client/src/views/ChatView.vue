<template>
  <div class="chatView">
    <v-container style="margin-top: 80px">
      <v-row>
        <h1 class="white--text mx-3">List of Enquiries</h1>
      </v-row>
      <v-list color="#131418" class="mt-3">
        <v-list-item
          v-for="chat in chats"
          :key="chat._id"
          class="px-5"
          style="cursor: pointer"
          @click="openChat(chat)"
        >
          <v-card class="my-3 pa-3" width="100%" dark elevation="4">
            <v-row align-content="center" class="justify-center">
              <v-list-item-icon class="mx-3">
                <v-icon>mdi-chat</v-icon>
              </v-list-item-icon>
              <v-list-item-content class="mx-3">
                <v-list-item-title>
                  {{ chat.users[0].username }}
                </v-list-item-title>
              </v-list-item-content>
            </v-row>
          </v-card>
        </v-list-item>
      </v-list>
    </v-container>
    <ChatDialog />
  </div>
</template>

<script>
import axiosInstance from '@/api';
import ChatDialog from '@/components/ChatDialog.vue';
export default {
  name: 'ChatView',
  data() {
    return {
      chats: [],
    };
  },
  methods: {
    getChats() {
      this.$store.commit('loading', true);
      axiosInstance
        .get(`/chat/book/${this.$router.currentRoute.params.id}`)
        .then((response) => {
          this.chats = response.data;
          this.$store.commit('loading', false);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit('loading', false);
        });
    },
    openChat(chat) {
      axiosInstance
        .get(`/chat/${chat._id}`)
        .then((res) => {
          this.$store.commit('setChat', res.data);
          this.$store.commit('setChatDialog', true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getChats();
  },
  components: { ChatDialog },
};
</script>

<style scoped>
.chatView {
  min-height: 100vh;
  background-color: #131418;
}
</style>