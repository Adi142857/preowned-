<template>
  <div>
    <div class="container">
    <div class="main-body">
    
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
             
              <li class="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav>
    
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <!-- <span alt="Admin" class="rounded-circle" width="150">{{ initials }}</span> -->
                    <v-avatar size="150" color="#000044">
                <span class="white--text text-h2">{{ initials }}</span>
              </v-avatar>
                    <div class="mt-3">
                      <h4>{{user.username.charAt(0).toUpperCase() + user.username.slice(1)}}</h4>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{user.username.charAt(0).toUpperCase() + user.username.slice(1)}}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {{ user.email }}
                    </div>
                  </div>
                  <hr>
                  
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Profile details</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      New user
                    </div>
                  </div>
                  <hr>

                </div>
              </div>
            </div>
          </div>

        </div>
        <v-container class="profile" fluid style="background-color: #000044; border-radius:20px;">

          <v-col class="px-4 py-8">
          <v-row class="py-4">
            <h1 class="white--text text-h4 ">
              Uploaded Products
            </h1>
          </v-row>
          <v-row>
            <v-container v-if="products.length > 0">
              <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="product in products" :key="product.id">
                  <ProductCard
                  :product="product"
                  :inProfile="true"
                  @refresh="getProducts"
                  @editProduct="editProduct"
                />
                </v-flex>
              </v-layout>
            </v-container>
            <v-container v-else class="text-center">
              <h2 class="white--text">No products uploaded yet</h2>
            </v-container>
          </v-row>
          </v-col>

          <v-col class="px-4 py-8">
          <v-row class="py-10">
            <h3 class="white--text text-h4 ">
              Uploaded Requirements
            </h3>
          </v-row>
          <v-row v-if="requirements.length > 0">
            <v-col v-for="item in requirements" :key="item.id" cols="12" sm="6" md="4">
              <ResourceCard
              :requirement="item"
              :inProfile="true"
              @refresh="getRequirements"
              @editRequirement="editRequirement"
            />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12" class="text-center">
              <h2 class="white--text">No Requirements Found</h2>
            </v-col>
          </v-row>
          </v-col>
          <AddProductForm :isEdit="isEdit" :product="product" @edit="productEditReq" />
          <AddResForm :isEdit="isEdit" :requirement="requirement" @edit="requirementEditReq" />
          <ResDetailsDialog v-if="$store.state.resDetailsDialog" />
          </v-container>
            </div>
  </div>
</template>
<style>
body{
    margin-top:20px;
    color: #e2e8f0;
    text-align: left;
    background-color:  #1a202c;    
}
.main-body {
    padding: 15px;
}
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.gutters-sm {
    margin-right: -8px;
    margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
    padding-right: 8px;
    padding-left: 8px;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}
.h-100 {
    height: 100%!important;
}
.shadow-none {
    box-shadow: none!important;
}
h2, .h2 {
    font-size: 1.5rem;
}
.v-application .text-h4 {
    font-size: 1.8rem !important;
    font-weight: 400;
    line-height: 2.5rem;
    letter-spacing: 0.0073529412em !important;
    font-family: "Roboto", sans-serif !important;
}
.breadcrumb-item.active {
    color: #0b0e10;
}
.text-secondary {
    color: #000000 !important;
}
</style>
<script>
import axiosInstance from '@/api';
  export default {
    name: 'ProfileView',
    data() {
      return {
        initials: '',
        user: {
          username: '',
          email: '',
        },
        products: [],
        requirements: [],
        isEdit: false,
        product: {},
        requirement: {},
      };
    },
    components: {
      ProductCard: () => import('@/components/ProductCard.vue'),
      AddProductForm: () => import('@/components/AddProducts.vue'),
      AddResForm: () => import('@/components/AddRequirements.vue'),
      ResourceCard: () => import('@/components/RequirementsCard.vue'),
      ResDetailsDialog: () => import('@/components/ReqDialog.vue'),
    },
    methods: {
      getUser() {
        axiosInstance.get('/auth/me').then((response) => {
          this.user = response.data.user;
          this.initials = this.user.username.charAt(0).toUpperCase();
        });
      },
      getProducts() {
        axiosInstance.get('/products/me').then((response) => {
          this.products = response.data;
        });
      },
      getRequirements() {
        axiosInstance.get('/requirements/me').then((response) => {
          this.requirements = response.data;
        });
      },
      editProduct(product) {
        this.product =product;
        this.$store.commit('setFormDialog', true);
        this.isEdit = true;
      },
      productEditReq(payload) {
        axiosInstance
          .put(`/products/${this.product._id}`, payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.$store.commit('setFormDialog', false);
            this.isEdit = false;
            this.$store.commit('flashSuccess', 'Product Edited Successfully');
            this.getProducts();
          })
          .catch((err) => {
            this.$store.commit('loading', false);
            console.log(err);
          });
      },
      editRequirement(requirement) {
        this.requirement = requirement;
        this.$store.commit('setResDialog', true);
        this.isEdit = true;
      },
      requirementEditReq(payload) {
        axiosInstance
          .put(`/requirements/${this.requirement._id}`, payload)
          .then(() => {
            this.$store.commit('loading', false);
            this.$store.commit('setResDialog', false);
            this.isEdit = false;
            this.$store.commit('flashSuccess', 'Requirement Edited Successfully');
            this.getRequirements();
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
      this.getProducts();
      this.getRequirements();
    },
  };
</script>