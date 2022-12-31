<template lang="">
    <div>
    <header id="header" class="header">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-xl-5">
                <div class="text-container" >
                    <h1 class="h1-large text-left" >We connect buyers and sellers</h1>
                    
                    <p class="p-large text-left">Find influencers to buy and sell products in India's largest online C2C marketplace, connecting buyers with suppliers.</p>
                    <a class="btn-solid-lg" href="#services">Offered services</a>
                </div>
            </div> 
            <div class="col-lg-6 col-xl-7">
                <div class="image-container">
                    <img class="img-fluid" src="https://www.clarity-ventures.com/images/web-development/ecommerce-marketplace-2.png" alt="alternative" />
                </div> 
            </div> 
        </div> 
    </div> 
    
    </header> 
    <div id="services" class="cards-1 bg-gray">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h2 class="explore">Explore our services</h2>
                </div> 
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12">                    
                    <div class="card">
                        <div>
                          <v-card class="mx-auto" max-width="344">
                            <v-img src="https://img.freepik.com/free-vector/chatbot-customer-service-abstract-concept_335657-3037.jpg?w=740&t=st=1672061923~exp=1672062523~hmac=eea91f4c71f9c44c6466d31eb09556b8ae80b8083dd808e6a94e9655a953037f" height="200px" @click="$router.push('/products')"></v-img>
                            <v-card-title>Top products and exchanges</v-card-title>
                            <!-- <v-card-subtitle>1,000 miles of wonder</v-card-subtitle> -->
                            <v-card-actions>
                              <v-btn  color="#1A237E" text>Explore</v-btn>
                              <v-spacer/>
                              <v-btn icon @click="show1 = !show1">
                              <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                              </v-btn>
                            </v-card-actions>
                            <v-expand-transition>
                              <div v-show="show1">
                                <v-divider/>
                                <v-card-text>
                                  See the top products and exchanges in the market. We have a wide range of products and exchanges to choose from.
                                </v-card-text>
                              </div>
                            </v-expand-transition>
                          </v-card>
                        </div> 
                    </div>
                    <div class="card">
                      <div>
                          <v-card class="mx-auto" max-width="344">
                            <v-img src="https://img.freepik.com/free-vector/list-concept-illustration_114360-1320.jpg?w=740&t=st=1672062040~exp=1672062640~hmac=a0c17fbdef3a9030109d6d331d0b6d13806d52e4dc85f0fb59863087200c302b" height="200px"  @click="$router.push('/requirements')"></v-img>
                            <v-card-title>Upload your requirements</v-card-title>
                            
                            <v-card-actions>
                              <v-btn  color="#1A237E" text>Explore</v-btn>
                              <v-spacer/>
                              <v-btn icon @click="show2 = !show2">
                              <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                              </v-btn>
                            </v-card-actions>
                            <v-expand-transition>
                              <div v-show="show2">
                                <v-divider/>
                                <v-card-text>
                                  Upload your requirements and get the best offers from the sellers. We have a wide range of products and exchanges to choose from.
                                </v-card-text>
                              </div>
                            </v-expand-transition>
                          </v-card>
                        </div> 
                    </div>
                    
                    <div class="card">
                      <div>
                          <v-card class="mx-auto" max-width="344" >
                            <v-img src="https://img.freepik.com/free-vector/teamwork-concept-landing-page_52683-20165.jpg?w=740&t=st=1672130327~exp=1672130927~hmac=576d1682f5b9169d48e84b1b2cbd4492bd063d4c06f0cc8971c8a5f8e208860d" height="200px" @click="$router.push('/aboutus')"></v-img>
                            <v-card-title>About us</v-card-title>
                            <v-card-actions>
                              <v-btn  color="#1A237E" text>Explore</v-btn>
                              <v-spacer/>
                              <v-btn icon @click="show3 = !show3">
                              <v-icon>{{ show3 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                              </v-btn>
                            </v-card-actions>
                            <v-expand-transition>
                              <div v-show="show3">
                                <v-divider/>
                                <v-card-text>
                                  We are a team of professionals who are passionate about helping people. We are here to help you with your requirements.
                                </v-card-text>
                              </div>
                            </v-expand-transition>
                          </v-card>
                        </div> 
                    </div>
                    
                </div>
            </div>
        </div>
    </div> 
    <div>
        <footer class="text-center text-white" style="background-color: rgb(22 54 145);">
  <!-- Grid container -->
  <div class="container pt-4">
    <!-- Section: Social media -->
    <section class="mb-4">
      <!-- Facebook -->
      <a
        class="btn btn-link btn-floating btn-lg text-white m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-facebook-f"></i
      ></a>

      <!-- Twitter -->
      <a
        class="btn btn-link btn-floating btn-lg text-white m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-twitter"></i
      ></a>

      <!-- Instagram -->
      <a
        class="btn btn-link btn-floating btn-lg text-white m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-instagram"></i
      ></a>

      <!-- Linkedin -->
      <a
        class="btn btn-link btn-floating btn-lg text-white m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-linkedin"></i
      ></a>
      <!-- Github -->
      <a
        class="btn btn-link btn-floating btn-lg text-white m-1"
        href="#!"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-github"></i
      ></a>
    </section>
    <!-- Section: Social media -->
  </div>
  <!-- Grid container -->
  <div class="text-center text-white p-3">
    India's best selling site for preowned services
  </div>
  <!-- Copyright -->
  <div class="text-center text-white p-3" style="background-color: #1A237E;">
    © 2022 Copyright:
    <a class="text-white" href="">Preowned.com</a>
  </div>
  <!-- Copyright -->
        </footer>
        <button id="myBtn">
        <img src="assets/images/up-arrow.png" alt="alternative" />
        </button>
        </div>
    </div>

</template>
<script>
export default {
    name: 'LandingPage',
    data: () => ({
      show1: false,
      show2: false,
      show3: false,
    }),
}
</script>
<style>
body{
    font-size: 0.85rem;
}
.explore{
  text-align: center;
  font-weight: 600;
}
.card{
    cursor: pointer;
}

</style>