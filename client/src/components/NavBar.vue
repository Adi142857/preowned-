<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary dark>
      <v-list>
        <v-list-item>
          <v-list-item-avatar v-if="$store.state.isLoggedIn">
            <Avatar />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">Pre-owned</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-list dense>
        <v-list-item link @click="$router.push('/')">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1"> Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/products')">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-shopping-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/requirements')">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-file-upload-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Requirements</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/aboutus')">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">About us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="$router.push('/profile')">
          <v-list-item-icon class="justify-center">
            <v-icon>mdi-account-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        
        <v-list-item
          link
          @click="$router.push('/login')"
          v-if="!$store.state.isLoggedIn"
        >
        <v-list-item-icon class="justify-center">
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>


          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
        <v-list-item
          link
          @click="logout"
          class="mt-4"
          v-if="$store.state.isLoggedIn"
        >
        <v-list-item-icon class="justify-center">
            <v-icon>mdi-logout-variant theme--dark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="px-6" :class="{ expand: false }" color="black" height="60px">
      <v-toolbar-title>
        <v-img
          src="@/assets/preowned-.png"
          max-width="100px"
          max-height="100px"
          @click="$router.push('/')"
          style="cursor: pointer"
        ></v-img>
      </v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-4"
        v-if="isXs"
        color="white"
      />
      <div v-else>
        <v-btn text @click="$router.push('/')">
          <span class="mr-2 white--text">Home</span>
        </v-btn>
        <v-btn text @click="$router.push('/products')">
          <span class="mr-2 white--text">Products</span>
        </v-btn>
        <v-btn text @click="$router.push('/requirements')">
          <span class="mr-2 white--text">Requirements</span>
        </v-btn>
        <v-btn text @click="$router.push('/aboutus')">
          <span class="mr-2 white--text">About us</span>
        </v-btn>
        <!-- avatar -->
      
        <v-btn
          v-if="!$store.state.isLoggedIn"
          color="red"
          class="ml-2"
          @click="$router.push('/login')"
        >
          
          <span class="white--text">LogIn</span>
        </v-btn>
        <Avatar v-if="$store.state.isLoggedIn" />
      </div>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
    isXs: false,
    items: [],
  }),
  components: {
    Avatar: () => import('@/components/AvatarPage.vue'),
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    logout() {
      this.$store.dispatch('logout');
      if (this.$route.path !== '/') this.$router.push('/');
      this.drawer = false;
    },
  },
  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
};
</script>

<style scoped>
.v-application .black {
  background-color: #1A237E !important;
}
.v-toolbar__content {
  background-color: #1A237E;
}
.v-list-item__title, .v-list-item__subtitle {
    /* flex: 1 1 100%; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.v-toolbar {
  transition: 0.6s;
}

.theme--dark.v-navigation-drawer .v-divider {
    border-color: rgb(255 255 255);
}
.v-btn.v-size--default {
    font-size: 0.799rem;
}
.expand {
  height: 80px !important;
  padding-top: 10px;
}
</style>