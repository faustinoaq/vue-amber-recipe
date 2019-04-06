<template lang="pug">
.div
  ul.errors
    li(v-for="error in errors") {{ error }}

  form
    .form-group
      input(v-model="product.title" placeholder="Title" class="form-control")
    .form-group
      textarea(v-model="product.description" placeholder="Description" class="form-control" size="30x10")
    .form-group
      label(for="category")
      select(v-model="product.category_id" id="category" class="form-control")
        template(v-if="categories.length")
          option(v-for="category in categories" :value="category.id") {{ category.title }}
        template(v-else)
          option(disabled) No categories
    button.btn.btn-primary.btn-sm(@click.prevent="onSubmit()") Submit
    | 
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProductForm",
  props: {
    _product: Object
  },
  computed: {
    ...mapState("Product", ["csrf"]),
    ...mapState("Category", ["categories"]),
    product() {
      return Object.assign({}, this._product);
    }
  },
  methods: {
    ...mapActions("Product", ["submit"]),
    ...mapActions("Category", ["categoryIndex"]),
    onSubmit() {
      this.submit({ self: this });
    }
  },
  data() {
    return {
      action: "/products/",
      method: "POST",
      errors: []
    };
  },
  mounted() {
    if (this._product.id >= 0) {
      this.action += this._product.id;
      this.method = "PATCH";
    }
  },
  created(){
    this.categoryIndex({ self: this });
  }
};
</script>
