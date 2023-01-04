<template>
    <div>
      <div class="product">
        <div class="product__header">
          <h1 class="product__title">Available products</h1>
          <v-btn
            v-if="this.$store.state.isLoggedIn"
            class="product__button"
            @click="$store.commit('setFormDialog', true)">
            Add
          </v-btn>
        </div>
        <v-container v-if="products.length > 0">
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="product in products" :key="product.id">
              <ProductCard :product="product" />
            </v-flex>
          </v-layout>
        </v-container>
        <div v-else class="product__empty">
          <v-progress-circular
            indeterminate
            color="blue"
            class="mt-5"
            v-if="$store.state.loading"
          ></v-progress-circular>
          <span v-else>No products as of now</span>
        </div>
      </div>
      <AddProductForm v-if="$store.state.formDialog" @addProduct="addProduct" />
      <ChatDialog v-if="$store.state.chat.chatDialog" />
    </div>
  </template>
  
  <script>
  import ProductCard from '@/components/ProductCard.vue';
  import AddProductForm from '@/components/AddProducts.vue';
  import ChatDialog from '@/components/ChatDialog.vue';
  import axiosInstance from '@/api';
  export default {
    name: 'ProductsPage',
    components: {
      ProductCard,
      AddProductForm,
      ChatDialog,
    },
    data() {
      return {
        products: [],
      };
    },
    methods: {
      async fetchProducts() {
        this.$store.commit('loading', true);
        axiosInstance
          .get('/products')
          .then((response) => {
            this.$store.commit('loading', false);
            this.products = response.data;
          })
          .catch((error) => {
            this.$store.commit('loading', false);
            console.log(error);
          });
      },
      addProduct(payload) {
        axiosInstance
          .post('/products', payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.fetchProducts();
            this.$store.commit('setFormDialog', false);
          })
          .catch((error) => {
            this.$store.commit('loading', false);
            console.log(error);
          });
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  .product {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fcfafb;
    padding-top: 100px;
    min-height: 100vh;
  }
  .product__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .product__title {
    font-size: 2rem;
    color: rgb(31, 27, 27);
  }
  .product__empty {
    font-size: 1.5rem;
    color: rgb(22, 20, 20);
  }
  .product__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
  }
  .product__button {
    background-color: rgb(28, 26, 26);
    color: #131418;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  </style>