<template lang="pug">
div
  h1 Edit Product
  ProductForm(:product="product")
</template>

<script>
import ProductForm from "./_form.vue";

export default {
  name: "ProductEdit",
  components: {
    ProductForm: ProductForm
  },
  computed: {
    product() {
      this.$store.getters["products/get"](this.$route.params.id)
    }
  },
  methods: {
    fetchProduct() {
      this.$store.dispatch("product/edit", this.$route.params.id);
    }
  },
  created() {
    this.fetchProduct();
  }
};
</script>
