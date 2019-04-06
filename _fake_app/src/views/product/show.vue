<template lang="pug">
div
  h1 Show Product
  p {{product.title}}
  p {{product.description}}
  p {{product.category_id}}
  p
    router-link.btn.btn-secondary.btn-sm(to="/products") back
    | 
    router-link.btn.btn-success.btn-sm(:to="'/products/' + product.id + '/edit'") Edit
</template>

<script>
export default {
  name: "ProductShow",
  computed: {
    product() {
      this.$store.getters["products/get"](this.$route.params.id)
    }
  },
  methods: {
    fetchProduct() {
      this.$store.dispatch("products/show", this.$route.params.id);
    }
  },
  created() {
    this.fetchProduct();
  }
};
</script>
