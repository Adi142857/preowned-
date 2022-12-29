<template>
  <v-dialog v-model="$store.state.formDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Add a new product</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            outlined
            dense
            prepend-inner-icon="mdi-book"
            :rules="rules"
          />
          <v-text-field
            label="Author"
            v-model="author"
            outlined
            dense
            prepend-inner-icon="mdi-account"
            :rules="rules"
          />
          <v-text-field
            label="Description"
            v-model="description"
            prepend-inner-icon="mdi-format-quote-open"
            placeholder="A short description about the book."
            outlined
            dense
            :rules="rules"
          />
          <!-- allow numbers only -->
          <v-text-field
            label="Price"
            v-model="price"
            placeholder="X.rs"
            outlined
            dense
            prepend-inner-icon="mdi-currency-inr"
            :rules="rules"
            type="number"
          />
          <v-text-field
            label="Category"
            v-model="category"
            prepend-inner-icon="mdi-tag"
            outlined
            dense
            :rules="rules"
          />
          <!-- contact -->
          <v-text-field
            label="Contact"
            v-model="contact"
            prepend-inner-icon="mdi-phone"
            outlined
            dense
            placeholder="Phone number/email/Instagram/Whatsapp"
            :rules="phoneRules"
            type="number"
          />
          <!-- allow images only -->
          <v-file-input
            label="Image"
            v-model="image"
            outlined
            dense
            :rules="rulesImage"
            accept="image/jpeg, image/png"
          ></v-file-input>
          <v-col class="text-right">
            <v-btn color="white" @click="$store.commit('setFormDialog', false)"
              >Cancel</v-btn
            >
            <v-btn color="red" @click="submit" class="ml-3">
              <!-- show a loading progress -->
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
import imageUploadService from '@/services/ImgUploadService';
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    rulesImage: {
      get() {
        return this.isEdit ? [] : [(v) => !!v || 'Field is required'];
      },
    },
  },
  data() {
    return {
      image: null,
      rules: [(v) => !!v || 'Field is required'],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => v.length >= 3 || 'Phone number must be at least 10 digits',
      ],
      title: '',
      author: '',
      description: '',
      price: '',
      category: '',
      contact: '',
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.$store.commit('loading', true);
        var url = '';
        try {
          if (this.image !== null) url = await imageUploadService(this.image);
        } catch (e) {
          this.$store.commit('loading', false);
         
          console.log(e);
        }
        this.$store.commit('flashSuccess', 'Product added successfully');
        const toEdit = {
          title: this.title,
          author: this.author,
          description: this.description,
          price: this.price,
          category: this.category,
          contact: this.contact,
        };
        if (this.isEdit) {
          if (url !== '') toEdit.image = url;
          this.$emit('edit', toEdit);
        } else {
          this.$emit('addProduct', { ...toEdit, image: url });
        }
      }
    },
  },
  watch: {
    isEdit: function () {
      if (this.isEdit) {
        this.title = this.product.title;
        this.author = this.product.author;
        this.description = this.product.description;
        this.price = this.product.price;
        this.category = this.product.category;
        this.contact = this.product.contact;
      }
    },
  },
};
</script>

<style scoped>
.headline {
  color: #004;
}

.v-application .red{
    background-color: rgb(248, 248, 252) !important;
    color: #004 !important;
}
</style>